import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  private _alive:boolean = true;

  team_name: string = '';
  players = [];

  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.team_name = this._route.snapshot.paramMap.get("params");
    console.log(this.team_name);
    this._teamsService.getTeamPlayerStats(this.team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.players = resp as [];
    });
  }

}
