import { Component, OnInit, OnDestroy } from "@angular/core";
import { GamesService } from "src/app/_services/games.service";
import { CurrentSeasonService } from "src/app/_services/current-season.service";
import { takeWhile } from "rxjs/operators";
import { Game } from "src/app/_models/games";

@Component({
  selector: "app-day-games",
  templateUrl: "./day-games.component.html",
  styleUrls: ["./day-games.component.css"],
})
export class DayGamesComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  isLoading: boolean;

  currentSeason: string;
  dayValue: string = "day";
  currentDay: number = 146;

  groupGames: any;

  constructor(
    private _gamesService: GamesService,
    private _currentSeasonService: CurrentSeasonService
  ) {
    this.currentSeason = this._currentSeasonService.currentSeason;
  }

  ngOnInit() {
    this.getDaySchedule(this.currentSeason, this.currentDay);
  }

  changeSchedule(value) {
    // console.log(value);
    switch (value) {
      case "day":
        this.isLoading = true;
        this.getDaySchedule(this.currentSeason, this.currentDay);
        break;
      case "prev":
        this.isLoading = true;
        this.getDaySchedule(this.currentSeason, this.currentDay - 5);
        break;
      case "next":
        this.isLoading = true;
        this.getDaySchedule(this.currentSeason, this.currentDay + 5);
        break;
      default:
        break;
    }
  }

  filterGames(games: Game[], day: number) {
    const setOne = games.filter((game: Game) => game.game_day === day);
    const setTwo = games.filter((game: Game) => game.game_day === day + 1);
    const setThree = games.filter((game: Game) => game.game_day === day + 2);
    const setFour = games.filter((game: Game) => game.game_day === day + 3);
    const setFive = games.filter((game: Game) => game.game_day === day + 4);
    return [setOne, setTwo, setThree, setFour, setFive];
  }

  getDaySchedule(season: string, currentDay: number) {
    this._gamesService
      .getGamesForDays(season, currentDay)
      .pipe(takeWhile(() => this._alive))
      .subscribe((games: Game[]) => {
        this.groupGames = this.filterGames(games, currentDay);
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
