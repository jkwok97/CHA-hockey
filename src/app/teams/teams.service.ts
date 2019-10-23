import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private _http: HttpClient
  ) { }

  getTeamPlayerStats(team) {
    console.log(team);
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`);
  }
}
