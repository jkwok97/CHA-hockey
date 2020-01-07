import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SalaryService } from './salary.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  teamPicked: boolean = false;
  salaryPicked: boolean = false;
  isMobile: boolean = false;

  teams = [];
  salaries: any[];
  teamPage: any;
  team: any;

  type: string;
  currentSeason: string;
  seasonType: string;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  allSalaries: MatTableDataSource<any[]>;
  mobileAllSalariesColumnsToDisplay = [ 'team_logo','player_name', 'current_season_salary', 'year_two']
  allSalariesColumnsToDisplay = [ 'team_logo', 'team_name', 'player_name', 'current_season_salary', 'year_two', 'year_three', 'year_four', 'year_five' ];

  @ViewChild('teamSelect', {static: false}) teamSelect;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(
    private _teamsService: TeamsService,
    private sanitizer: DomSanitizer,
    private _salaryService: SalaryService,
    private _router: Router
  ) { 
    this.currentSeason = this._teamsService.currentSeason;
    this.seasonType = this._teamsService.currentSeasonType;
  }

  ngOnInit() {
    this.checkMobile();
    this.teams = [];
    this.teams = this._teamsService.allSalaryPagesArray;
    this.teams.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }

  toSalaryPage(event) {
    this.teamSelect.value = event.value;
    this.team = this.teams.find(team => team.name === this.teamSelect.value);
    if (event.value == "All Forwards") {
      this._router.navigate(['/salary/forwards']);
      this.getSalaries("forward");
      this.type = "Forward";
    } else if (event.value == "All Defense") {
      this._router.navigate(['/salary/defense']);
      this.getSalaries("defense");
      this.type = "Defense";
    } else if (event.value == "All Goaltenders") {
      this._router.navigate(['/salary/goalies']);
      this.getSalaries("goalie");
      this.type = "Goalie";
    } else {
      this.salaryPicked = false;
      this.teamPicked = true;
      this._salaryService.setTeamTrigger(this.team.shortName);
      this.openTeamSalary(this.team);
    }
  }

  openTeamSalary(team) {
    // console.log(team);
    this._router.navigate([`/salary/${team.shortName}`]);
    window.scrollTo(0,0);
  }

  applyFilter(filterValue: string) {
    this.allSalaries.filter = filterValue.trim().toLowerCase();
    if (this.allSalaries.paginator) {
      this.allSalaries.paginator.firstPage();
    }
  }

  getSalaries(position) {
    this.teamPicked = true;
    this.salaryPicked = true;
    this.isLoading = true;
    this._salaryService.getSalaries(position, this.seasonType, this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.salaries = resp as [];
      this.allSalaries = new MatTableDataSource<any[]>(this.salaries);
      this.length = this.salaries.length;
      this.isLoading = false;
      setTimeout(() => {
        this.allSalaries.paginator = this.paginator;
        this.allSalaries.sort = this.sort;
      }, 350);
    });
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
          this._teamsService.setMobile(true);
        } else {
          this.isMobile = false;
          this._teamsService.setMobile(false);
        }
  }

  openPlayer(name, team, position, hits) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    this._teamsService.setPlayerHits(hits);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
    this.teams = [];
  }

}
