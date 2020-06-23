import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { takeWhile } from 'rxjs/operators';
import { Team } from 'src/app/_models/team';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = true;
  isMobile: boolean;

  team: Team;

  activeLinkIndex = -1;

  routes = [
    {name: 'Salaries', url: 'salaries', current: true},
    {name: 'Current', url: 'current', current: false},
    {name: 'Team History', url: 'archives/team', current: false},
    {name: 'Player History', url: 'archives/players', current: false},
    {name: 'Goalie History', url: 'archives/goalies', current: false},
  ];
  
  constructor(
    private _route: ActivatedRoute,
    private _teamInfoService: TeamInfoService,
    private _displayService: DisplayService
  ) { 
    this.getTeamInfo(this._route.snapshot.params.id);
  }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
  }

  getTeamInfo(id: number) {
    this._teamInfoService.getTeambyId(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((team:Team) => {
      this.team = team;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
