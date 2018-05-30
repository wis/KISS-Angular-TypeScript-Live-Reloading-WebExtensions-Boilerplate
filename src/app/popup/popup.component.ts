import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor() {
    console.log('popup component VViewed!');
  }

  ngOnInit() {}
}
console.log('popup component loaded!');
