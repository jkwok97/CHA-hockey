import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalieAward } from 'src/app/_models/awards';
import { AwardsService } from 'src/app/_services/awards.service';

@Component({
  selector: 'app-goalie-award',
  templateUrl: './goalie-award.component.html',
  styleUrls: ['./goalie-award.component.css']
})
export class GoalieAwardComponent implements OnInit {

  scorers$: Observable<GoalieAward[]>;

  constructor(
    private _awardsService: AwardsService
  ) { 
    this.scorers$ = this._awardsService.getGoalies();
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
