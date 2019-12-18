import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private _subjectTeam = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) { }

  getSalaries(position, type, year) {
    let options = {params: new HttpParams()
      .set('position', position)
      .set('type', type)
      .set('year', year)
    }
    return this._http.get(`${environment.back_end_url}/salaries/`, options);
  }

  getTeamSalaries(position, type, year, team) {
    let options = {params: new HttpParams()
      .set('position', position)
      .set('type', type)
      .set('year', year)
      .set('team', team)
    }
    return this._http.get(`${environment.back_end_url}/salaries/`, options);
  }

  setTeamListener(): Observable<any> {
    return this._subjectTeam.asObservable();
  }

  setTeamTrigger(team) {
    this._subjectTeam.next(team);
  }
}
