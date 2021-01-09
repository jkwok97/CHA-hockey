import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  teams: Team[];

  activeLinkIndex = -1;

  routes = [
    {name: 'Salaries', url: 'salaries', current: true, disabled: false},
    {name: 'Current', url: 'current', current: false, disabled: false},
    {name: 'Ratings', url: 'ratings', current: false, disabled: false},
    {name: 'Awards', url: 'awards', current: false, disabled: false},
    {name: 'Team History', url: 'archives/team', current: false, disabled: false},
    {name: 'Player History', url: 'archives/players', current: false, disabled: false},
    {name: 'Goalie History', url: 'archives/goalies', current: false, disabled: false},
  ];
  
  constructor(
    private _route: ActivatedRoute,
    private _teamInfoService: TeamInfoService,
    private _displayService: DisplayService,
    private _router: Router
  ) { 
    this.getTeamInfo(this._route.snapshot.params.id);
  }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this._teamInfoService.getTeamsByActive('true').pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams.filter((team) => team.id !== 54);
    })
  }

  checkTeamStatus() {
    setTimeout(() => {
      return !this.team.isactive;
    }, 500)
  }

  getTeamInfo(id: number) {
    this._teamInfoService.getTeambyId(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((team:Team) => {
      this.team = team;
      if (!this.team.isactive) {
        this.routes[0].disabled = true;
        this.routes[1].disabled = true;
      }
      this.isLoading = false;
    })
  }

  selectBackTeam() {
    this.isLoading = true;
    const index = this.teams.findIndex((team) => team.id === this.team.id);
    const path = this._route.snapshot.firstChild.routeConfig.path;

    if (index === 0) {
      this._router.navigate([`teams/${this.teams[this.teams.length-1].shortname}/${this.teams[this.teams.length-1].id}/${path}`]);
      this.getTeamInfo(this.teams[this.teams.length-1].id);
    } else {
      this._router.navigate([`teams/${this.teams[index-1].shortname}/${this.teams[index-1].id}/${path}`]);
      this.getTeamInfo(this.teams[index-1].id);
    }
    
  }

  selectForwardTeam() {
    this.isLoading = true;
    const index = this.teams.findIndex((team) => team.id === this.team.id);
    const path = this._route.snapshot.firstChild.routeConfig.path;

    if (index+1 === this.teams.length) {
      this._router.navigate([`teams/${this.teams[0].shortname}/${this.teams[0].id}/${path}`]);
      this.getTeamInfo(this.teams[0].id);
    } else {
      this._router.navigate([`teams/${this.teams[index+1].shortname}/${this.teams[index+1].id}/${path}`]);
      this.getTeamInfo(this.teams[index+1].id);
    }
    
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
