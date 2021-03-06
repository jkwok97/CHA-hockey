import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamStatsService {

  constructor(
    private _http: HttpClient
  ) { }

  getTeamStatsByUser(id: number, seasonType: string) {

    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/${id}/type`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamStatsByTeamIdBySeasonbyType(id: number, season: string, seasonType: string) {
    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/season/team/${id}`, options).pipe(
      map(result => result['result'][0])
    )
  }

  getTeamStatsBySeasonByType(season: string, seasonType: string) {
    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/season`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamStatsBySeasonByTypeByConference(season: string, seasonType: string) {
    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/season/conference`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamStatsBySeasonByTypeByDivision(season: string, seasonType: string) {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/season/division`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamStatsByType(seasonType: string) {
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/type/season`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamStatsByTypeSummed(seasonType: string) {
    const options = {params: new HttpParams()
      .set('season_type', seasonType)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/type/all-time`, options).pipe(
      map(result => result['result'])
    )
  }

  getScheduleTeamStats(season: string, id: number) {
    const options = {params: new HttpParams()
      .set('playing_year', season)
    }
    
    return this._http.get(`${environment.back_end_url}/v2/team-stats/schedule/team/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

}
