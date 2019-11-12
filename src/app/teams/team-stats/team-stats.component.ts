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
  currentTeam: boolean = false;

  short_team_name: string = '';

  currentTeams = [];

  team: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService
  ) { 
    this._teamsService.league.conference[0].division[0].teams.forEach(team => { this.currentTeams.push(team) });
    this._teamsService.league.conference[0].division[1].teams.forEach(team => { this.currentTeams.push(team) });
    this._teamsService.league.conference[1].division[0].teams.forEach(team => { this.currentTeams.push(team) });
    this._teamsService.league.conference[1].division[1].teams.forEach(team => { this.currentTeams.push(team) });
    // console.log(this.currentTeams);
  }

  ngOnInit() {
    this.isLoading = true;
    this.short_team_name = this._route.snapshot.paramMap.get("params");
    this.team = this._teamsService.getTeamInfo(this.short_team_name);
    if (this.currentTeams.find(team => team.shortName === this.team.shortName)) {
      this.currentTeam = true;
    }
    // console.log(this.currentTeam);
    this.isLoading = false;
  }

  toSalaryPage() {
    window.open(this.team.link);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
