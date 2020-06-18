import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhlService {

  constructor(
    private _http: HttpClient
  ) { }

  getNhlLeaders(season, player, stat, sort, trim) {
    let options = {params: new HttpParams()
      .set('season', season)
      .set('playerType', player)
      .set('statType', stat)
      .set('sort', sort)
      .set('qty', trim)
    }
    return this._http.get(`${environment.back_end_url}/nhl-leaders/`, options);
  }

  getNhlRookieLeaders(season, player, stat) {
    let options = {params: new HttpParams()
      .set('season', season)
      .set('playerType', player)
      .set('statType', stat)
    }
    return this._http.get(`${environment.back_end_url}/nhl-rookie-leaders/`, options);
  }

  getNHLsummary(season, player, statsType, sort, start, pageSize) {
    let options = {params: new HttpParams()
      .set('season', season)
      .set('playerType', player)
      .set('statsType', statsType)
      .set('sort', sort)
      .set('start', start)
      .set('pageSize', pageSize)
    }
    return this._http.get(`${environment.back_end_url}/nhl-leaders/summary`, options);
  }

  getNHLRookiesummary(season, player, statsType, sort, start, pageSize) {
    let options = {params: new HttpParams()
      .set('season', season)
      .set('playerType', player)
      .set('statsType', statsType)
      .set('sort', sort)
      .set('start', start)
      .set('pageSize', pageSize)
    }
    return this._http.get(`${environment.back_end_url}/nhl-rookie-leaders/summary`, options);
  }

  getChaTeam(id, type) {
    let options = {params: new HttpParams()
      .set('id', id)
      .set('playerType', type)
    }
    return this._http.get(`${environment.back_end_url}/nhl-leaders/`, options);
  }
}