import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { SalaryService } from '../salary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-team-salary',
  templateUrl: './team-salary.component.html',
  styleUrls: ['./team-salary.component.css']
})
export class TeamSalaryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;

  short_team_name: string;
  currentSeason: string;
  nextSeason: string = "2020-21";
  currentSeasonType: string;
  totalForwardsCurrentSalary: string;
  totalForwardsYearTwoSalary: string;
  totalDefenseCurrentSalary: string;
  totalDefenseYearTwoSalary: string;
  totalGoalieCurrentSalary: string;
  totalGoalieYearTwoSalary: string;
  
  team: any;
  teamRoster: any[] = [];
  salaries: any[] = [];

  totalForwards: number;
  totalDefense: number;
  totalGoalie: number;
  totalPlayers: number;
  currentSeasonCap: number = 100.3;
  nextSeasonCap: number = 102.7;
  currentSeasonPayroll: number;
  currentSeasonSpace: number;
  nextSeasonPayroll: number;
  nextSeasonSpace: number;

  forwardSalaries: MatTableDataSource<any[]>;
  defenceSalaries: MatTableDataSource<any[]>;
  goalieSalaries: MatTableDataSource<any[]>;
  salariesColumnsToDisplay = [ 'player_name', 'position', 'current_season_salary', 'year_two'];
  mobileSalariesColumnsToDisplay = [ 'player_name', 'position', 'current_season_salary'];

  @ViewChild("forwardSort", {static: false}) forwardSort: MatSort;
  @ViewChild("defenceSort", {static: false}) defenceSort: MatSort;
  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;

  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService,
    private _salaryService: SalaryService
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.setTeam();
    this._salaryService.setTeamListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.teamRoster = [];
      this.setTeam();
    });
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  setTeam() {
    this.isLoading = true;
    setTimeout(() => {
      // console.log(this._route.children[0].url['_value'][0].path)
      this.short_team_name = this._route.children[0].url['_value'][0].path;
      this.team = this._teamsService.getTeamInfo(this.short_team_name);
      // console.log(this.team);
      this.currentSeason = this._teamsService.currentSeason;
      this.currentSeasonType = this._teamsService.currentSeasonType;
      this.getSalaries(this.team.shortName);
    }, 500);
  }

  getSalaries(team) {
    this._salaryService.getTeamSalaries("goalie", this.currentSeasonType, this.currentSeason, team).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let goalies = resp as [];
      this.totalGoalie = goalies.length;
      this.totalGoalieCurrentSalary = this.getTotalSalary(goalies, "current");
      this.totalGoalieYearTwoSalary = this.getTotalSalary(goalies, "yearTwo");
      this.goalieSalaries = new MatTableDataSource<any[]>(goalies);
      setTimeout(() => {
        this.goalieSalaries.sort = this.goalieSort;
      }, 350);
      goalies.forEach(player => {
        this.teamRoster.push(player);
      });
      this._salaryService.getTeamSalaries("defense", this.currentSeasonType, this.currentSeason, team).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let defense = resp as [];
        this.totalDefense = defense.length;
        this.totalDefenseCurrentSalary = this.getTotalSalary(defense, "current");
        this.totalDefenseYearTwoSalary = this.getTotalSalary(defense, "yearTwo");
        this.defenceSalaries = new MatTableDataSource<any[]>(defense);
        setTimeout(() => {
          this.defenceSalaries.sort = this.defenceSort;
        }, 350);
        defense.forEach(player => {
          this.teamRoster.push(player);
        });
        this._salaryService.getTeamSalaries("forward", this.currentSeasonType, this.currentSeason, team).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          // console.log(resp);
          let forwards = resp as [];
          this.totalForwards = forwards.length;
          this.totalForwardsCurrentSalary = this.getTotalSalary(forwards, "current");
          this.totalForwardsYearTwoSalary = this.getTotalSalary(forwards, "yearTwo");
          this.forwardSalaries = new MatTableDataSource<any[]>(forwards);
          setTimeout(() => {
            this.forwardSalaries.sort = this.forwardSort;
          }, 350);
          forwards.forEach(player => {
            this.teamRoster.push(player);
          });
          // console.log(this.teamRoster)
          this.getTotalsForRoster();
          this.isLoading = false;
        });
      });
    });
  }

  getTotalSalary(array, string) {
    let total = 0;
    if (string === "current") {
      array.forEach(element => {
        if ((Number(element.current_season_salary) > 0)) {
          total += Number(element.current_season_salary);
        }
      });
      return total.toFixed(3);
    } else {
      array.forEach(element => {
        if ((Number(element.year_two) > 0)) {
          total += Number(element.year_two);
        }
      });
      return total.toFixed(3);
    } 
  }

  getTotalsForRoster() {
    this.totalPlayers = this.totalForwards + this.totalGoalie + this.totalDefense;
    this.currentSeasonPayroll = this.getCapTotal("current");
    this.currentSeasonSpace = this.currentSeasonPayroll - this.currentSeasonCap;
    this.nextSeasonPayroll = this.getCapTotal("next");
    this.nextSeasonSpace = this.nextSeasonPayroll - this.nextSeasonCap;
  }

  getCapTotal(string) {
    let total = 0;
    if (string === "current") {
      this.teamRoster.forEach(player => {
        if ((Number(player.current_season_salary) > 0)) {
          total += Number(player.current_season_salary);
        }
      })
      return total;
    } else {
      this.teamRoster.forEach(player => {
        if ((Number(player.year_two) > 0)) {
          total += Number(player.year_two);
        }
      })
      return total;
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}