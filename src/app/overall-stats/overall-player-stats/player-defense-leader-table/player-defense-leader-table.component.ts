import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-player-defense-leader-table',
  templateUrl: './player-defense-leader-table.component.html',
  styleUrls: ['./player-defense-leader-table.component.css']
})
export class PlayerDefenseLeaderTableComponent implements OnInit, OnDestroy {

  @Input() currentSeason: string;

  private _alive: boolean = true;
  isLoading: boolean = false;

  leader: any;

  leaders: MatTableDataSource<any[]>;
  columns = ['team_logo','player_name', 'games_played', 'goals', 'assists', 'points'];
  mobileColumns = ['team_logo','player_name', 'games_played', 'points'];

  constructor(
    private _displayService: DisplayService,
    private _playerStatsService: PlayerStatsService
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
    this._playerStatsService.getDefenseLeaders(this.currentSeason, seasonType).pipe(
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
