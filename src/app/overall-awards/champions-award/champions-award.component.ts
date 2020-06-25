import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AwardsService } from 'src/app/_services/awards.service';
import { OwnerAward } from 'src/app/_models/awards';

@Component({
  selector: 'app-champions-award',
  templateUrl: './champions-award.component.html',
  styleUrls: ['./champions-award.component.css']
})
export class ChampionsAwardComponent implements OnInit {

  champions$: Observable<OwnerAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.champions$ = this._awardsService.getChampions();
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
