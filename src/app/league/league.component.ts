import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../teams/teams.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  northwestTeams = [];
  southwestTeams = [];
  northeastTeams = [];
  southeastTeams = [];

  constructor(
    private _router: Router,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.northwestTeams = this._teamsService.league.conference[0].division[0].teams;
    this.southwestTeams = this._teamsService.league.conference[0].division[1].teams;
    this.northeastTeams = this._teamsService.league.conference[1].division[0].teams;
    this.southeastTeams = this._teamsService.league.conference[1].division[1].teams;
  }

  sendToTeam(team) {
    this._router.navigate([`teams/${team}`]);
  }

}
