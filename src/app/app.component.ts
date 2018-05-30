import { Component } from '@angular/core';
import { browser, Cookies } from 'webextension-polyfill-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    browser.contextMenus.onClicked.addListener(info => {
      console.log(info);
    });
    //browser.menus.create()
  }
}
