import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStat } from 'src/app/_models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goalie-save-pct-leader-table',
  templateUrl: './goalie-save-pct-leader-table.component.html',
  styleUrls: ['./goalie-save-pct-leader-table.component.css']
})
export class GoalieSavePctLeaderTableComponent implements OnInit {

  @Input() currentSeason: string;

  private _alive: boolean = true;
  isLoading: boolean = false;

  minGames: number;

  leader: any;

  leaders: MatTableDataSource<any[]>;
  columns = ['team_logo','player_name', 'games_played', 'save_pct'];

  constructor(
    private _displayService: DisplayService,
    private _goalieStatsService: GoalieStatsService,
    private _currentSeasonService: CurrentSeasonService,
    private _router: Router
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
    this._goalieStatsService.getSavePctLeaders(this.currentSeason, seasonType, this.minGames).pipe(
      takeWhile(() => this._alive)
    ).subscribe((leaders) => {
      this.isLoading = false;
      this.leader = leaders[0];
      const data = leaders.slice(1,10);
      this.leaders = new MatTableDataSource<any[]>(data);
    })
  }

  openPlayer(player: PlayerStat) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
