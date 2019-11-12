import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../teams.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historical-team-stats',
  templateUrl: './historical-team-stats.component.html',
  styleUrls: ['./historical-team-stats.component.css']
})
export class HistoricalTeamStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  short_team_name: string = '';

  team: any;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.short_team_name = this._route.snapshot.paramMap.get("params");
    this.team = this._teamsService.getTeamInfo(this.short_team_name);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
