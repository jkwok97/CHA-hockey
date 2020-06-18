import { Component, OnInit, Input } from '@angular/core';
import { TeamStat } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-team-pk-leader-table',
  templateUrl: './team-pk-leader-table.component.html',
  styleUrls: ['./team-pk-leader-table.component.css']
})
export class TeamPkLeaderTableComponent implements OnInit {

  @Input() teamStats: TeamStat[];

  isMobile: boolean;
  leaders: MatTableDataSource<any[]>;

  mobileColumns = [ 'team_logo', 'pk_attempts', 'pk_goals', 'pk_pct']
  columns = [ 'team_logo','team_name', 'pk_attempts', 'pk_goals', 'pk_pct' ];

  constructor(
    private _displayService: DisplayService
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
    this.getPKLeagueLeaders(this.teamStats);
  }

  getPKLeagueLeaders(teamStats) {
    const data = teamStats.filter((stat: TeamStat) => stat.games_played > 0);
    const sortedData = data.sort((a,b) => (((b.pk_attempts - b.pk_goals) / b.pk_attempts) * 100) - (((a.pk_attempts - a.pk_goals) / a.pk_attempts) * 100));
    this.leaders = new MatTableDataSource<any[]>(sortedData);
  }

}
