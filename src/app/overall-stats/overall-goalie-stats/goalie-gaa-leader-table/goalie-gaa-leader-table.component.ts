import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';

@Component({
  selector: 'app-goalie-gaa-leader-table',
  templateUrl: './goalie-gaa-leader-table.component.html',
  styleUrls: ['./goalie-gaa-leader-table.component.css']
})
export class GoalieGaaLeaderTableComponent implements OnInit, OnDestroy {

  @Input() currentSeason: string;

  private _alive: boolean = true;
  isLoading: boolean = false;

  minGames: number;

  leader: any;

  leaders: MatTableDataSource<any[]>;
  columns = ['team_logo','player_name', 'games_played', 'goals_against_avg'];

  constructor(
    private _displayService: DisplayService,
    private _goalieStatsService: GoalieStatsService,
    private _currentSeasonService: CurrentSeasonService
  ) {
    this.minGames = this._currentSeasonService.minGames;
   }

  ngOnInit() {

    this._displayService.listenerSeasonTypeChange().pipe(
      takeWhile(() => this._alive)
    ).subscribe((seasonType: string) => {
      this.isLoading = true;
      this.getStats(seasonType);
    })

  }

  getStats(seasonType: string) {
    this._goalieStatsService.getGaaLeaders(this.currentSeason, seasonType, this.minGames).pipe(
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
