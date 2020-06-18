import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-player-point-leader-table',
  templateUrl: './player-point-leader-table.component.html',
  styleUrls: ['./player-point-leader-table.component.css']
})
export class PlayerPointLeaderTableComponent implements OnInit, OnDestroy {

  @Input() currentSeason: string;

  private _alive: boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  leader: any;

  leaders: MatTableDataSource<any[]>;
  columns = ['team_logo','player_name', 'games_played', 'goals', 'assists', 'points'];
  mobileColumns = ['team_logo','player_name', 'games_played', 'points'];

  constructor(
    private _displayService: DisplayService,
    private _playerStatsService: PlayerStatsService
  ) {
    this.isMobile = this._displayService.isMobile;
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

    this._playerStatsService.getPointLeaders(this.currentSeason, seasonType).pipe(
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
