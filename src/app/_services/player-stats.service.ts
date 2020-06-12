import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PlayerStat } from '../_models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  constructor(
    private _http: HttpClient
  ) { }

  getPlayersBySeasonByTypeByTeam(id: number, season: string, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/current/team/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

}
