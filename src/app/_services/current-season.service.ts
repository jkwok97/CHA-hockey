import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSeasonService {

  isOffSeason: boolean = true;

  currentSeasonCap: number = 102.7;
  nextSeasonCap: number = 102.7;

  draftSeason: string = '2020';

  currentSeason: string = this.handleSeason(this.isOffSeason);
  currentSeasonType: string = 'Regular';

  minGames: number = this.handleMinGames(this.isOffSeason);

  seasonHasPlayoffs: boolean = this.handlePlayoffButton();
  
  // need to account for roster somehow
  constructor() { }

  handleSeason(bool: boolean) {
    return bool ? '2019-20' : '2020-21'
  }

  handleMinGames(bool: boolean) {
    return bool ? 10 : 0
  }

  handlePlayoffButton() {
    return this.currentSeason === '2019-20' ? true : false;
  }

}
