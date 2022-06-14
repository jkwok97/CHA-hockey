import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurrentSeasonService {
  isOffSeason: boolean = true;

  currentSeasonCap: number = 102.7;
  nextSeasonCap: number = 104.02;

  draftSeason: string = "2022";

  currentSeason: string = this.handleSeason(this.isOffSeason);
  currentSeasonType: string = "Regular";
  nextSeason: string = "2023-24";

  minGames: number = this.handleMinGames(
    this.isOffSeason,
    this.currentSeasonType
  );

  seasonHasPlayoffs: boolean = this.handlePlayoffButton();

  // need to account for roster somehow
  constructor() {}

  handleSeason(bool: boolean) {
    return bool ? "2021-22" : "2022-23";
  }

  handleMinGames(bool: boolean, type: string) {
    return type === "Regular" ? (bool ? 10 : 5) : 1;
  }

  handlePlayoffButton() {
    return this.currentSeasonType === "Regular" ? true : false;
  }
}
