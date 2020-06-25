import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerAward } from 'src/app/_models/awards';
import { AwardsService } from 'src/app/_services/awards.service';

@Component({
  selector: 'app-season-award',
  templateUrl: './season-award.component.html',
  styleUrls: ['./season-award.component.css']
})
export class SeasonAwardComponent implements OnInit {

  champions$: Observable<OwnerAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.champions$ = this._awardsService.getSeason();
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
