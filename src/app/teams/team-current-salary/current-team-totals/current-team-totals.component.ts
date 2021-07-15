import { Component, OnInit, Input } from '@angular/core';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerSalary } from 'src/app/_models/player';

@Component({
  selector: 'app-current-team-totals',
  templateUrl: './current-team-totals.component.html',
  styleUrls: ['./current-team-totals.component.css']
})
export class CurrentTeamTotalsComponent implements OnInit {

  @Input() salaries: [];
  @Input() goalieSalaries: [];

  total: number;
  totalSalaries: any[];

  currentSeasonCap: number;
  nextSeasonCap: number;
  currentSeasonPayroll: number = 0;
  currentSeasonSpace: number = 0;
  nextSeasonPayroll: number = 0;
  nextSeasonSpace: number = 0;
  currentSeason: string;
  nextSeason: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService
  ) {
    this.currentSeasonCap = this._currentSeasonService.currentSeasonCap;
    this.nextSeasonCap = this._currentSeasonService.nextSeasonCap;
    // this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeason = '2021-22';
    this.nextSeason = this._currentSeasonService.nextSeason;
   }

  ngOnInit() {
    this.total = this.salaries.length + this.goalieSalaries.length;
    this.totalSalaries = this.salaries.concat(this.goalieSalaries);
    this.getTotals(this.totalSalaries);
    this.currentSeasonSpace = this.currentSeasonPayroll - this.currentSeasonCap;
    this.nextSeasonSpace = this.nextSeasonPayroll - this.nextSeasonCap;
  }

  getTotals(salaries: PlayerSalary[]) {
    salaries.forEach((salary: PlayerSalary) => {
      if (+salary.season_2021 > 0) {
        this.currentSeasonPayroll += +salary.season_2021;
      }
      if (+salary.season_2022 > 0) {
        this.nextSeasonPayroll += +salary.season_2022;
      } 
    })
  }

}
