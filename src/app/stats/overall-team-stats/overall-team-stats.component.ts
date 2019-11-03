import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-overall-team-stats',
  templateUrl: './overall-team-stats.component.html',
  styleUrls: ['./overall-team-stats.component.css']
})
export class OverallTeamStatsComponent implements OnInit, OnDestroy, AfterViewInit {

  private _alive:boolean = true;
  isLoading: boolean = false;

  stats: any[];
  westernStats: any[];
  easternStats: any[];
  northWesternStats: any[];
  northEasternStats: any[];
  southWesternStats: any[];
  southEasternStats: any[];
  league: any;

  short_team_name: string = '';

  northwestTeams = [];
  southwestTeams = [];
  northeastTeams = [];
  southeastTeams = [];

  teams: MatTableDataSource<any[]>;
  westernTeams: MatTableDataSource<any[]>;
  easternTeams: MatTableDataSource<any[]>;
  northWesternTeams: MatTableDataSource<any[]>;
  northEasternTeams: MatTableDataSource<any[]>;
  southWesternTeams: MatTableDataSource<any[]>;
  southEasternTeams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  @ViewChild("overallSort", {static: false}) overallSort: MatSort;
  @ViewChild("westernSort", {static: false}) westernSort: MatSort;
  @ViewChild("easternSort", {static: false}) easternSort: MatSort;
  @ViewChild("nwSort", {static: false}) nwSort: MatSort;
  @ViewChild("swSort", {static: false}) swSort: MatSort;
  @ViewChild("neSort", {static: false}) neSort: MatSort;
  @ViewChild("seSort", {static: false}) seSort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.league = this._teamsService.league;
    this.northwestTeams = this._teamsService.league.conference[0].division[0].teams;
    this.southwestTeams = this._teamsService.league.conference[0].division[1].teams;
    this.northeastTeams = this._teamsService.league.conference[1].division[0].teams;
    this.southeastTeams = this._teamsService.league.conference[1].division[1].teams;
    if (this._route.snapshot.routeConfig.path === "stats/league") {
      this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        this.stats = resp as [];
        this.teams = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.teams.sort = this.overallSort;
        }, 350);
      });
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        this.stats = resp as [];
        this.teams = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;  
        setTimeout(() => {
          this.teams.sort = this.overallSort;
        }, 350);
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.typeSelect.value = "league"
    }, 250);
    
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  getConferenceStats() {
    let westTeams = this.northwestTeams.concat(this.southwestTeams);
    let eastTeams = this.northeastTeams.concat(this.southeastTeams);
    this.westernStats = this.stats.filter(team => westTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.easternStats = this.stats.filter(team => eastTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.westernTeams = new MatTableDataSource<any[]>(this.westernStats);
    this.easternTeams = new MatTableDataSource<any[]>(this.easternStats);
    setTimeout(() => {
      this.length = this.westernStats.length;
      this.westernTeams.sort = this.westernSort;
      this.easternTeams.sort = this.easternSort;
      this.pageSize = 10;
    }, 500);
  }

  getDivisionStats() {
    this.northWesternStats = this.stats.filter(team => this.northwestTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.southWesternStats = this.stats.filter(team => this.southwestTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.northEasternStats = this.stats.filter(team => this.northeastTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.southEasternStats = this.stats.filter(team => this.southeastTeams.find(divTeam => divTeam.shortName === team.team_name));
    this.northWesternTeams = new MatTableDataSource<any[]>(this.northWesternStats);
    this.southWesternTeams = new MatTableDataSource<any[]>(this.southWesternStats);
    this.northEasternTeams = new MatTableDataSource<any[]>(this.northEasternStats);
    this.southEasternTeams = new MatTableDataSource<any[]>(this.southEasternStats);
    setTimeout(() => {
      this.northWesternTeams.sort = this.nwSort;
      this.southWesternTeams.sort = this.swSort;
      this.northEasternTeams.sort = this.neSort;
      this.southEasternTeams.sort = this.seSort;
      this.pageSize = 5;
      this.length = this.northWesternStats.length;
    }, 500);
  }

  onTabChange(event) {
    // console.log(event);
    if (event.tab.textLabel === "League") {
      this.pageSize = 5;
      this.length = 20;
    } else if (event.tab.textLabel === "Conference") {
      this.getConferenceStats();
    } else if (event.tab.textLabel === "Division") {
      this.getDivisionStats();
    }
  }

  openTeam(shortName) {
    this._router.navigate([`teams/${shortName}`])
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
