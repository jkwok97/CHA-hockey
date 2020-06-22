import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamInfoService {

  constructor(
    private _http: HttpClient
  ) { }

  getUserTeams(id: number): Observable<Team[]> {
    return this._http.get(`${environment.back_end_url}/v2/teams/user/${id}`).pipe(
      map(result => result['result'])
    )
  }

  getUserByTeamName(teamName: string): Observable<number> {
    return this._http.get(`${environment.back_end_url}/v2/teams/${teamName}/user/`).pipe(
      map(result => result['result'])
    )
  }

  getAllCurrentTeams(bool: boolean): Observable<Team[]> {

    const options = {params: new HttpParams()
      .set('isactive', bool.toString())
    }
    
    return this._http.get(`${environment.back_end_url}/v2/teams/current/all`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeambyId(id: number): Observable<Team> {
    return this._http.get(`${environment.back_end_url}/v2/teams/${id}`).pipe(
      map(result => result['result'][0])
    )
  }
}
