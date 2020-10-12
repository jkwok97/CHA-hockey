import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerAward } from 'src/app/_models/awards';
import { AwardsService } from 'src/app/_services/awards.service';

@Component({
  selector: 'app-defense-award',
  templateUrl: './defense-award.component.html',
  styleUrls: ['./defense-award.component.css']
})
export class DefenseAwardComponent implements OnInit {

  scorers$: Observable<PlayerAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.scorers$ = this._awardsService.getDefense();
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
