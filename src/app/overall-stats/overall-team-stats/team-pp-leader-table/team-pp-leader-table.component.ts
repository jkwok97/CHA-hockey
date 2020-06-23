import { Component, OnInit, Input } from '@angular/core';
import { TeamStat, Team } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-pp-leader-table',
  templateUrl: './team-pp-leader-table.component.html',
  styleUrls: ['./team-pp-leader-table.component.css']
})
export class TeamPpLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = [ 'team_logo', 'pp_attempts', 'pp_goals', 'pp_pct']
  columns = [ 'team_logo','team_name', 'pp_attempts', 'pp_goals', 'pp_pct' ];

  constructor(
    private _displayService: DisplayService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.getPPLeagueLeaders(this.teamStats);
  }

  getPPLeagueLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);
    const sortedData = data.sort((a,b) => ((b.pp_goals / b.pp_attempts) * 100) - ((a.pp_goals / a.pp_attempts) * 100));
    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

  routeToTeam(team: Team) {
    this._router.navigate([`/teams/${team.shortname}/${team['team_id']}/salaries`])
  }

}
