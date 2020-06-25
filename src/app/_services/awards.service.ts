import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion, Scorer } from '../_models/awards';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(
    private _http: HttpClient
  ) { }

  getChampions(): Observable<Champion[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/champions`).pipe(
      map(result => result['result'])
    )
  }

  getScorers(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/scorers`).pipe(
      map(result => result['result'])
    )
  }

  getRookies(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/rookies`).pipe(
      map(result => result['result'])
    )
  }

  getDefense(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/defense`).pipe(
      map(result => result['result'])
    )
  }

  getGoalies(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/goalies`).pipe(
      map(result => result['result'])
    )
  }

  getGms(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/gm`).pipe(
      map(result => result['result'])
    )
  }

  getSeason(): Observable<Scorer[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards/season`).pipe(
      map(result => result['result'])
    )
  }

}
