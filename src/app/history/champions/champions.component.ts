import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  currentChamp: any;
  champions = [];

  constructor(
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.currentChamp = this._teamsService.getTeamInfo("STA");
    this._teamsService.getChampions().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.champions = resp as [];
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
