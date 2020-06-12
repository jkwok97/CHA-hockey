import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get(`${environment.back_end_url}/v2/users/`).pipe(
        map(result => result['result'])
    )
  }

  getUser(email): Observable<User> {
    return this._http.get(`${environment.back_end_url}/v2/users/${email}`).pipe(
        map(result => result['result'])
    )
  }

//   getNhlLeaders(season, player, stat, sort, trim) {
//     // console.log(season, player, stat);
//     let options = {params: new HttpParams()
//       .set('season', season)
//       .set('playerType', player)
//       .set('statType', stat)
//       .set('sort', sort)
//       .set('qty', trim)
//     }
//     return this._http.get(`${environment.back_end_url}/nhl-leaders/`, options);
//   }

//   getNhlRookieLeaders(season, player, stat) {
//     // console.log(season, player, stat);
//     let options = {params: new HttpParams()
//       .set('season', season)
//       .set('playerType', player)
//       .set('statType', stat)
//     }
//     return this._http.get(`${environment.back_end_url}/nhl-rookie-leaders/`, options);
//   }

//   getNHLsummary(season, player, statsType, sort, start, pageSize) {
//     let options = {params: new HttpParams()
//       .set('season', season)
//       .set('playerType', player)
//       .set('statsType', statsType)
//       .set('sort', sort)
//       .set('start', start)
//       .set('pageSize', pageSize)
//     }
//     return this._http.get(`${environment.back_end_url}/nhl-leaders/summary`, options);
//   }

//   getNHLRookiesummary(season, player, statsType, sort, start, pageSize) {
//     let options = {params: new HttpParams()
//       .set('season', season)
//       .set('playerType', player)
//       .set('statsType', statsType)
//       .set('sort', sort)
//       .set('start', start)
//       .set('pageSize', pageSize)
//     }
//     return this._http.get(`${environment.back_end_url}/nhl-rookie-leaders/summary`, options);
//   }

//   getChaTeam(id, type) {
//     // console.log(id)
//     let options = {params: new HttpParams()
//       .set('id', id)
//       .set('playerType', type)
//     }
//     return this._http.get(`${environment.back_end_url}/nhl-leaders/`, options);
//   }
  
}
