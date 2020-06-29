import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Game } from '../_models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private _http: HttpClient
  ) { }

  getGamesForSeason(currentSeason: string): Observable<Game[]> {

    const options = {params: new HttpParams()
      .set('playing_year', currentSeason)
    };

    return this._http.get(`${environment.back_end_url}/v2/schedule/`, options).pipe(
      map(result => result['result'])
    )
  }

  getGamesForDays(currentSeason: string, day: number): Observable<Game[]> {

    const options = {params: new HttpParams()
      .set('playing_year', currentSeason)
      .set('start_range', day.toString())
      .set('end_range', (day + 5).toString())
    };

    return this._http.get(`${environment.back_end_url}/v2/schedule/days`, options).pipe(
      map(result => result['result'])
    )

  }

  getLastFiveGamesRecordForTeam(id: number, currentSeason: string): Observable<any> {

    const options = {params: new HttpParams()
      .set('playing_year', currentSeason)
    };

    return this._http.get(`${environment.back_end_url}/v2/schedule/last-five/${id}`, options).pipe(
      map(result => result['result'])
    )
  }

  getMatchUpRecord(teamIdOne: number, teamIdTwo: number, currentSeason: string): Observable<any> {

    const options = {params: new HttpParams()
      .set('playing_year', currentSeason)
      .set('team_one_id', teamIdOne.toString())
      .set('team_two_id', teamIdTwo.toString())
    };

    return this._http.get(`${environment.back_end_url}/v2/schedule/match-up`, options).pipe(
      map(result => result['result'])
    )

  }

}
