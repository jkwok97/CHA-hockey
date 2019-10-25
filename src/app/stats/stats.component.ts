import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private _alive:boolean = true;
  isLeadersLoading: boolean = false;
  isGoaliesLoading: boolean = false;

  pointLeaders = [];
  goalieLeaders = [];

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.isLeadersLoading = true;
    this.isGoaliesLoading = true;
    this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getPointLeaders(resp);
      this.isLeadersLoading = false;
    });
    this._teamsService.getGoalieStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.getGoalieLeaders(resp);
      this.isGoaliesLoading = false;
    });

  }

  getPointLeaders(resp) {
    console.log(resp);
    this.pointLeaders = resp as [];
    this.pointLeaders.sort((a,b) => b.points - a.points).splice(10, this.pointLeaders.length-10);
  }

  getGoalieLeaders(resp) {
    console.log(resp);
    this.goalieLeaders = resp as [];
    this.goalieLeaders.sort((a,b) => b.wins - a.wins).splice(10, this.goalieLeaders.length-10);
  }

}
