import { Injectable } from '@angular/core';
import { GoalieStat } from '../_models/player';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalieStatsService {

  constructor(
    private _http: HttpClient
  ) { }

  getGoaliesBySeasonByTypeByTeam(id: number, season: string, seasonType: string): Observable<GoalieStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/current/team/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getGoaliesByUserByType(id: number, seasonType: string): Observable<GoalieStat[]> {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/history/user/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getGoaliesByUserByShowByType(id: number, seasonType: string): Observable<GoalieStat[]> {
    
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/show/history/user/${id}`, options).pipe(
      map(result => result['result'])
    )
  }
}
