import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSeasonService {

  isOffSeason: boolean = false;

  currentSeasonCap: number = 102.7;
  nextSeasonCap: number = 102.7;

  draftSeason: string = '2020'

  currentSeason: string = this.handleSeason(this.isOffSeason);
  currentSeasonType: string = 'Playoffs';
  nextSeason: string = '2021-22'

  minGames: number = this.handleMinGames(this.isOffSeason, this.currentSeasonType);

  seasonHasPlayoffs: boolean = this.handlePlayoffButton();
  
  // need to account for roster somehow
  constructor() { }

  handleSeason(bool: boolean) {
    return bool ? '2019-20' : '2020-21'
  }

  handleMinGames(bool: boolean, type: string) {
    return type === 'Regular' ? bool ? 10 : 5 : 1;
  }

  handlePlayoffButton() {
    return this.currentSeason === '2020-21' ? true : false;
  }

}
