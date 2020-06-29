import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { GamesService } from 'src/app/_services/games.service';
import { Game } from 'src/app/_models/games';
import { DisplayService } from 'src/app/_services/display.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean = false;

  games: MatTableDataSource<Game[]>;

  mobileColumns = [ 'game_day', 'vis_team', 'versus', 'home_team', 'result' ];
  columns = [ 'game_day', 'vis_team', 'vis_team_name', 'vis_team_score', 'versus', 'home_team_score', 'home_team', 'home_team_name' ];

  currentSeason: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _gamesService: GamesService,
    private _displayeService: DisplayService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;

    this.getGames(this.currentSeason);
  }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayeService.isMobile;
  }

  getGames(season: string) {
    this._gamesService.getGamesForSeason(season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((games) => {
      this.games = new MatTableDataSource<any[]>(games as []);
      this.isLoading = false;
    })
  }

  applyFilter(filterValue: string) {
    this.games.filter = filterValue.trim().toLowerCase();
    if (this.games.paginator) {
      this.games.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
