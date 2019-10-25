import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams/teams.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private _teamsService: TeamsService,
  ) { }

  ngOnInit() {
  }

}
