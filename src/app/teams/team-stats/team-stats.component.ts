import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  short_team_name: string = '';

  team: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.short_team_name = this._route.snapshot.paramMap.get("params");
    this.team = this._teamsService.getTeamInfo(this.short_team_name);
    this.isLoading = false;
  }

  toSalaryPage() {
    window.open(this.team.link);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
