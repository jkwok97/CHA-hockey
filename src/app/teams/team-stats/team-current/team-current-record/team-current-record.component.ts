import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-current-record',
  templateUrl: './team-current-record.component.html',
  styleUrls: ['./team-current-record.component.css']
})
export class TeamCurrentRecordComponent implements OnInit {

  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
