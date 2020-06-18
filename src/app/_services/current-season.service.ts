import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSeasonService {

  isOffSeason: boolean = true;

  currentSeason: string = this.handleSeason(this.isOffSeason);
  currentSeasonType: string = 'Regular';

  minGames: number = this.handleMinGames(this.isOffSeason);
  
  // need to account for roster somehow
  constructor() { }

  handleSeason(bool: boolean) {
    return bool ? '2019-20' : '2020-21'
  }

  handleMinGames(bool: boolean) {
    return bool ? 10 : 0
  }

}
