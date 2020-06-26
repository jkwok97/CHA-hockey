import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private _http: HttpClient
  ) { }
  
  getPlayerInfoById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/players/${id}`).pipe(
      map(result => result['result'])
    )
  }

  getGoalieInfoById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/goalies/${id}`).pipe(
      map(result => result['result'])
    )
  }

  getPlayerTeamLogo(nhlId: number) {
    return this._http.get(`${environment.back_end_url}/v2/players/nhl/${nhlId}`).pipe(
      map(result => result['result'])
    )
  }

  getGoalieTeamLogo(nhlId: number) {
    return this._http.get(`${environment.back_end_url}/v2/goalies/nhl/${nhlId}`).pipe(
      map(result => result['result'])
    )
  }
}
