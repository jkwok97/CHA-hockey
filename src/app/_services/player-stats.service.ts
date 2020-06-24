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

  getPlayersBySeasonByType(season: string, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/season/current`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersBySeasonByTypeByForwards(season: string, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/season/forwards`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersBySeasonByDefense(season: string, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/season/defense`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersBySeasonByTypeByTeam(id: number, season: string, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/current/team/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersByUserByType(id: number, seasonType: string): Observable<PlayerStat[]> {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/history/user/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersByUserByShowByType(id: number, seasonType: string): Observable<PlayerStat[]> {
    
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/show/history/user/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayersStatsByType(seasonType: string) {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/season`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayerStatsByTypeSummed(seasonType: string) {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/all-time`, options).pipe(
      map(result => result['result'])
    )
  }

  getForwardStatsByType(seasonType: string) {
    
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/season/forward`, options).pipe(
      map(result => result['result'])
    )
  }

  getForwardStatsByTypeSummed(seasonType: string) {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/all-time/forward`, options).pipe(
      map(result => result['result'])
    )
  }

  getDefenseStatsByType(seasonType: string) {
    
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/season/defense`, options).pipe(
      map(result => result['result'])
    )
  }

  getDefenseStatsByTypeSummed(seasonType: string) {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/players-stats/type/all-time/defense`, options).pipe(
      map(result => result['result'])
    )
  }

  // ==================================== LEADERS ==========================================

  getPointLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/points`, options).pipe(
      map(result => result['result'])
    )

  }

  getRookieLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/rookies`, options).pipe(
      map(result => result['result'])
    )

  }

  getDefenseLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/defense`, options).pipe(
      map(result => result['result'])
    )

  }

  getGoalLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/goals`, options).pipe(
      map(result => result['result'])
    )

  }

  getAssistLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/assists`, options).pipe(
      map(result => result['result'])
    )

  }

  getPpGoalsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/ppgoals`, options).pipe(
      map(result => result['result'])
    )

  }

  getShGoalsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/shgoals`, options).pipe(
      map(result => result['result'])
    )

  }

  getShotsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/shots`, options).pipe(
      map(result => result['result'])
    )

  }

  getBlockedShotsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/blocked`, options).pipe(
      map(result => result['result'])
    )

  }

  getPenaltyLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/penalties`, options).pipe(
      map(result => result['result'])
    )

  }

  getMinutesLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/minutes`, options).pipe(
      map(result => result['result'])
    )

  }

  getPlusMinusLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/plus`, options).pipe(
      map(result => result['result'])
    )

  }

  getWorstPlusMinusLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/minus`, options).pipe(
      map(result => result['result'])
    )

  }

  getHitsLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/hits`, options).pipe(
      map(result => result['result'])
    )

  }

  getStreakLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/current`, options).pipe(
      map(result => result['result'])
    )

  }

  getLongStreakLeaders(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/leaders/long`, options).pipe(
      map(result => result['result'])
    )

  }


}
