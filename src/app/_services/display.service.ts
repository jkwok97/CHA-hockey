import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private _subjectPageShow = new Subject<any>();
  isMobile: boolean;

  constructor() { }

  triggerFullPageStats(type) {
    this._subjectPageShow.next(type);
  }

  listenerFullPageStats(): Observable<any> {
    return this._subjectPageShow.asObservable();
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

}
