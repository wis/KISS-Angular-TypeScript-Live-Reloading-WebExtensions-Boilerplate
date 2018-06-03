import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() {
    console.log('background component VViewed!');
  }

  ngOnInit() {
  }

}
console.log('background component loaded!');
