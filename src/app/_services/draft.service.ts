import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DraftTable } from '../_models/draft-table';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor(
    private _http: HttpClient
  ) { }

  getDraftTableByYear(currentSeason: string): Observable<DraftTable[]> {

    const options = {params: new HttpParams()
      .set('draft_year', currentSeason)
    }

    return this._http.get(`${environment.back_end_url}/v2/draft-table/`, options).pipe(
      map(result => result['result'])
    )
  }

  getDraftTableByStandings(draftSeason: string, currentSeason: string, currentSeasonType: string): Observable<DraftTable[]> {
    const options = {params: new HttpParams()
      .set('draft_year', draftSeason)
      .set('playing_year', currentSeason)
      .set('season_type', currentSeasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/draft-table/season/standings`, options).pipe(
      map(result => result['result'])
    )
  }
}
