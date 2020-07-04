import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllTransactions() {
    return this._http.get(`${environment.back_end_url}/v2/transactions`).pipe(
      map(result => result['result'])
    );
  }

  getTransactionByDates(start, end) {
    
    const options = {params: new HttpParams()
      .set('start', start)
      .set('end', end)
    }

    return this._http.get(`${environment.back_end_url}/v2/transactions/date`, options).pipe(
      map(result => result['result'])
    );
  }
}
