import { Component, OnInit, Input } from '@angular/core';
import { TeamStat } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-team-goal-diff-leader-table',
  templateUrl: './team-goal-diff-leader-table.component.html',
  styleUrls: ['./team-goal-diff-leader-table.component.css']
})
export class TeamGoalDiffLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = ['team_logo', 'goals_for', 'goals_against', 'goals_diff' ]
  columns = [ 'team_logo','team_name', 'goals_for', 'goals_against', 'goals_diff' ];

  constructor(
    private _displayService: DisplayService
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.getGoalDiffLeagueLeaders(this.teamStats);
  }

  getGoalDiffLeagueLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);
    const sortedData = data.sort((a,b) => (b.goals_for - b.goals_against) - (a.goals_for - a.goals_against));
    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

}
