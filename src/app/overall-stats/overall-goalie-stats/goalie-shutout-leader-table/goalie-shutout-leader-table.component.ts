import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-goalie-shutout-leader-table',
  templateUrl: './goalie-shutout-leader-table.component.html',
  styleUrls: ['./goalie-shutout-leader-table.component.css']
})
export class GoalieShutoutLeaderTableComponent implements OnInit {

  @Input() currentSeason: string;

  private _alive: boolean = true;
  isLoading: boolean = false;

  leader: any;

  leaders: MatTableDataSource<any[]>;
  columns = ['team_logo','player_name', 'games_played', 'shutouts'];

  constructor(
    private _displayService: DisplayService,
    private _goalieStatsService: GoalieStatsService
  ) { }

  ngOnInit() {

    this._displayService.listenerSeasonTypeChange().pipe(
      takeWhile(() => this._alive)
    ).subscribe((seasonType: string) => {
      this.isLoading = true;
      this.getStats(seasonType);
    })

  }

  getStats(seasonType: string) {
    this._goalieStatsService.getShutoutLeaders(this.currentSeason, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((leaders) => {
      this.isLoading = false;
      this.leader = leaders[0];
      const data = leaders.slice(1,10);
      this.leaders = new MatTableDataSource<any[]>(data);
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}