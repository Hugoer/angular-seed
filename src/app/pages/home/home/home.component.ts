import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  time = new Date();

  constructor() { }

  ngOnInit() {
  }

}
