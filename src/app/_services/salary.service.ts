import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerSalary } from '../_models/player';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(
    private _http: HttpClient
  ) { }

  getPlayerSalaryById(id: number, season:string): Observable<PlayerSalary[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
    }
  
    return this._http.get(`${environment.back_end_url}/v2/salaries/team/${id}/players`, options).pipe(
      map(result => result['result'])
    )
  }

  getGoalieSalaryById(id: number, season:string): Observable<PlayerSalary[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
    }

    return this._http.get(`${environment.back_end_url}/v2/salaries/team/${id}/goalies`, options).pipe(
      map(result => result['result'])
    )
  }

  getAllActiveSalaries(isactive: string) {

    const options = {params: new HttpParams()
      .set('isactive', isactive)
    }

    return this._http.get(`${environment.back_end_url}/v2/players/salaries/active`, options).pipe(
      map(result => result['result'])
    )

  }
}
