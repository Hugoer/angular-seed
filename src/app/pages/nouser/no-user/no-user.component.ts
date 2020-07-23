import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoUserComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
