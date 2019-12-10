import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _subjectTwitter = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers() {
    return this._http.get(`${environment.back_end_url}/users/`);
  }

  getUser(email) {
    return this._http.get(`${environment.back_end_url}/players-stats/${email}`);
  }
  
}
