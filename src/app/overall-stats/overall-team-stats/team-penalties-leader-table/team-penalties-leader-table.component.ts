import { Component, OnInit, Input } from '@angular/core';
import { TeamStat, Team } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-penalties-leader-table',
  templateUrl: './team-penalties-leader-table.component.html',
  styleUrls: ['./team-penalties-leader-table.component.css']
})
export class TeamPenaltiesLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = ['team_logo', 'penalty_minutes', 'pim_game']
  columns = [ 'team_logo','team_name', 'penalty_minutes', 'pim_game' ];

  constructor(
    private _displayService: DisplayService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.getPimLeagueLeaders(this.teamStats);
  }

  getPimLeagueLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);
    const sortedData = data.sort((a,b) => (b.penalty_minutes / b.games_played) - (a.penalty_minutes / a.games_played));
    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

  routeToTeam(team: Team) {
    this._router.navigate([`/teams/${team.shortname}/${team['team_id']}/salaries`])
  }

}
