import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSeasonService {

  currentSeason: string = '2020-21';
  currentSeasonType: string = 'Regular';

  constructor() { }
}
