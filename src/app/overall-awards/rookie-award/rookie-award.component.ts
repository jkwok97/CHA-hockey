import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerAward } from 'src/app/_models/awards';
import { AwardsService } from 'src/app/_services/awards.service';

@Component({
  selector: 'app-rookie-award',
  templateUrl: './rookie-award.component.html',
  styleUrls: ['./rookie-award.component.css']
})
export class RookieAwardComponent implements OnInit {

  scorers$: Observable<PlayerAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.scorers$ = this._awardsService.getRookies();
  }

  ngOnInit() {
    
  }

  getLogo(logo: string) {
    return `url(${logo})`
  }

  getColor(color:string) {
    return `${color}95`
  }

}
