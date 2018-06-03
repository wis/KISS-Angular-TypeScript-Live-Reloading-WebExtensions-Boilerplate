// import chromep from 'chrome-promise';
import { browser } from 'webextension-polyfill-ts';
import browserd from 'browser-detect';

const filesInDirectory = dir =>
  new Promise<Array<any>>(resolvee =>
    dir.createReader().readEntries(entries =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== '.')
          .map(
            e =>
              e.isDirectory
                ? filesInDirectory(e)
                : new Promise(resolve => e.file(resolve))
          )
      )
        .then(files => [].concat(...files))
        .then(resolvee)
    )
  );

const timestampForFilesInDirectory = dir =>
  filesInDirectory(dir).then(files =>
    files.map(f => f.name + f.lastModifiedDate).join()
  );

/*url: [`chrome-extension://${chrome.runtime.id}/*`, 'chrome://newtab']*/
const reload = async () => {
  const tabs = await browser.tabs.query({});
  const ext_tabs = tabs.filter(
    t =>
      t.url
        .toLowerCase()
        .startsWith(`chrome-extension://${browser.runtime.id}`) ||
      t.url.toLowerCase().startsWith('chrome://newtab')
  );
  const tabsIds = ext_tabs.map(t => t.id); // ttttg
  const alldone = ext_tabs.map(t => true);
  const doneNavAwaytab = (index, tabId) => {
    alldone[index] = false;
    if (alldone.every(d => d === false)) {
      // presist tabsIds to local storage before reload..
      localStorage.setItem('tabsIds', JSON.stringify(tabsIds));
      browser.runtime.reload();
    }
  };
  ext_tabs.map(async (t0, index, arr) => {
    const ttab = await browser.tabs.update(t0.id, {
      url: `data:text/html,<script>
    document.title = '${t0.id} | ${t0.title}';
    document.write("<h1>${t0.id} | ${t0.title}</h1>")
    document.write("<h1>reloading...</h1>")
    setTimeout(() => {
      window.history.back();
    }, 600);
    </script>`
    });
    if (ttab) {
      console.log(
        `${t0.id} "${t0.title}" navigated away. ${index}/${arr.length}`
      );
      doneNavAwaytab(index, t0.id);
    }
  });
};

const watchChanges = (dir, lastTimestamp = null) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      console.log('no changes..', window.outerWidth, window.outerHeight);
      setTimeout(() => watchChanges(dir, timestamp), 600); // retry after 1s
    } else {
      console.log('reloading..');
      reload();
    }
  });
};

browser.management.getSelf().then(self => {
  if (self.installType === 'development') {
    const browserinfo = browserd();
    if (browserinfo.name === 'chrome' || browserinfo.name === 'opera') {
      chrome.runtime.getPackageDirectoryEntry(dE => watchChanges(dE));
      return;
    } else {
      browser.runtime.getBrowserInfo().then(info => {
        if (
          info.name.toLowerCase() !== 'chrome' ||
          info.name.toLowerCase() !== 'opera'
        ) {
          console.log(
            'on browser other than Chromium or Opera, web-ext is used'
          );
        } else {
          console.log('auto/live reloading is supported with web-ext');
        }
      });
    }
  }
});
