import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TeamStat } from 'src/app/_models/team';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-team-win-streak-leader-table',
  templateUrl: './team-win-streak-leader-table.component.html',
  styleUrls: ['./team-win-streak-leader-table.component.css']
})
export class TeamWinStreakLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = ['team_logo', 'win_streak']
  columns = [ 'team_logo','team_name', 'win_streak' ];

  constructor(
    private _displayService: DisplayService
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.getWinStreakLeaders(this.teamStats);
  }

  getWinStreakLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);
    const sortedData = data.sort((a,b) => b.long_win_streak - a.long_win_streak);
    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

}
