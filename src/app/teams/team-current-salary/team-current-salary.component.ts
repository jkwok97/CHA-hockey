import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/_models/team';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { takeWhile } from 'rxjs/operators';
import { SalaryService } from 'src/app/_services/salary.service';
import { PlayerSalary } from 'src/app/_models/player';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { DisplayService } from 'src/app/_services/display.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _teamInfoService: TeamInfoService,
    private _salaryService: SalaryService,
    private _currentSeasonService: CurrentSeasonService
  ) {
    this.getTeamInfo(this._route.snapshot['_urlSegment'].segments[2].path);
    this.getTeamPlayerSalary(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
    this.getTeamGoalieSalary(this._route.snapshot['_urlSegment'].segments[2].path, this.currentSeason);
   }

  ngOnInit() {

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

  ngOnDestroy(): void {
    this._alive = false;
  }

}
