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

  getWinsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/leaders/wins`, options).pipe(
      map(result => result['result'])
    )

  }

  getShutoutLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/leaders/shutouts`, options).pipe(
      map(result => result['result'])
    )

  }

  getSavePctLeaders(season: string, seasonType: string, minGames: number) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
      .set('min_games', minGames.toString())
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/leaders/savepct`, options).pipe(
      map(result => result['result'])
    )

  }

  getGaaLeaders(season: string, seasonType: string, minGames: number) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
      .set('min_games', minGames.toString())
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/leaders/gaa`, options).pipe(
      map(result => result['result'])
    )

  }

  getShotsFacedLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/leaders/shots`, options).pipe(
      map(result => result['result'])
    )

  }
}
