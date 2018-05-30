import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newtab',
  templateUrl: './newtab.component.html',
  styleUrls: ['./newtab.component.css']
})
export class NewtabComponent implements OnInit {
  constructor() {
    console.log('newtab component VViewed!');
  }

  ngOnInit() {}
}
console.log('newtab component loaded!');
