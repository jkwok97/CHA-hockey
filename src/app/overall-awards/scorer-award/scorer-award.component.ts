import { Component, OnInit } from '@angular/core';
import { PlayerAward } from 'src/app/_models/awards';
import { AwardsService } from 'src/app/_services/awards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scorer-award',
  templateUrl: './scorer-award.component.html',
  styleUrls: ['./scorer-award.component.css']
})
export class ScorerAwardComponent implements OnInit {

  scorers$: Observable<PlayerAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.scorers$ = this._awardsService.getScorers();
  }

  ngOnInit() {
    
  }

  getLogo(logo: string) {
    return `url(${logo})`
  }

  getColor(color:string) {
    return `${color}95`
  }

  getPlayerPicture(id: number) {
    return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}@2x.jpg`
  }

}
