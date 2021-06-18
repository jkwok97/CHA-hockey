import { Component, OnInit, Input } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { TeamStat, Team } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-point-leader-table',
  templateUrl: './team-point-leader-table.component.html',
  styleUrls: ['./team-point-leader-table.component.css']
})
export class TeamPointLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = ['team_logo', 'games_played', 'wins', 'loss', 'ties', 'points']
  columns = [ 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'win_pct' ];

  constructor(
    private _displayService: DisplayService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.getLeagueLeaders(this.teamStats);
  }

  getLeagueLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);

    const sortedData = data.sort((a,b) => {

      if (b.points === a.points) {
        if (b.wins === a.wins) {
          if ((b.goals_for-b.goals_against) === (a.goals_for-a.goals_against)) {
            return b.goals_for - a.goals_for;
          } else {
            return (b.goals_for-b.goals_against) - (a.goals_for-a.goals_against);
          }
        } else {
          return b.wins - a.wins;
        }
      } else {
        return b.points - a.points;
      }
    });

    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

  routeToTeam(team: Team) {
    this._router.navigate([`/teams/${team.shortname}/${team['team_id']}/salaries`])
  }

}
