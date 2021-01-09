import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Team } from 'src/app/_models/team';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { filter, takeWhile } from 'rxjs/operators';
import { SalaryService } from 'src/app/_services/salary.service';
import { PlayerSalary } from 'src/app/_models/player';

@Component({
  selector: 'app-team-current-salary',
  templateUrl: './team-current-salary.component.html',
  styleUrls: ['./team-current-salary.component.css']
})
export class TeamCurrentSalaryComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = true;

  team: Team;

  currentSeason: string = '2020-21';

  forwardSalaries: PlayerSalary[];
  defenseSalaries: PlayerSalary[];
  goalieSalaries: PlayerSalary[];
  salaries: PlayerSalary[] = [];
  protectedPlayers: PlayerSalary[];
  protectedGoalies: PlayerSalary[];

  constructor(
    private _route: ActivatedRoute,
    private _teamInfoService: TeamInfoService,
    private _salaryService: SalaryService,
    private _router: Router
  ) {
    this.getTeamInfo(this._route.snapshot['_urlSegment'].segments[2].path);
    this.getTeamPlayerSalary(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
    this.getTeamGoalieSalary(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
    this.getProtectedPlayers(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
    this.getProtectedGoalies(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
   }

  ngOnInit() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeWhile(() => this._alive)
    ).subscribe((event) => {
      this.isLoading = true;
      this.protectedPlayers = null;
      const splitUrl = event['url'].split("/");
      this.getTeamInfo(splitUrl[3]);
      this.getTeamPlayerSalary(splitUrl[3], this.currentSeason);
      this.getTeamGoalieSalary(splitUrl[3], this.currentSeason);
      this.getProtectedPlayers(splitUrl[3], this.currentSeason);
      this.getProtectedGoalies(splitUrl[3], this.currentSeason);
    });
  }

  getTeamInfo(id: number) {
    this._teamInfoService.getTeambyId(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((team:Team) => {
      this.team = team;
      this.isLoading = false;
    })
  }

  getTeamPlayerSalary(id: number, season: string) {
    this._salaryService.getPlayerSalaryById(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((salaries: PlayerSalary[]) => {
      this.forwardSalaries = salaries['forwards']['players'];
      this.defenseSalaries = salaries['defense']['players'];
      const temp = this.forwardSalaries.concat(this.defenseSalaries);
      this.salaries = temp;
    })
  }

  getTeamGoalieSalary(id: number, season: string) {
    this._salaryService.getGoalieSalaryById(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((salaries: PlayerSalary[]) => {
      this.goalieSalaries = salaries;
    })
  }

  getProtectedPlayers(id: number, season: string) {
    this._salaryService.getProtectedPlayersById(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((salaries: PlayerSalary[]) => {
      if (salaries) {
        const forwards = salaries['forwards']['players'];
        const defense = salaries['defense']['players'];
        this.protectedPlayers = forwards.concat(defense);
      }
    }, error => {
      console.log(error);
    })
  }

  getProtectedGoalies(id: number, season: string) {
    this._salaryService.getProtectedGoaliesById(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((salaries: PlayerSalary[]) => {
      if (salaries) {
        this.protectedGoalies = salaries;
      }
    }, error => {
      console.log(error);
    })
    
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
