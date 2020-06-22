import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { TeamInfoService } from '../_services/team-info.service';
import { takeWhile } from 'rxjs/operators';
import { Team } from '../_models/team';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  private _alive: boolean = true;

  conferences: [];

  constructor(
    private _router: Router,
    private _teamInfoService: TeamInfoService
  ) { }

  ngOnInit() {
    this._teamInfoService.getAllCurrentTeams(true).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.conferences = teams as [];
    })
  }

  sendToTeam(team: string, id: number) {
    this._router.navigate([`teams/${team}/${id}/salaries`]);
  }

}
