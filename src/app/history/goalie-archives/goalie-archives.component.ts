import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goalie-archives',
  templateUrl: './goalie-archives.component.html',
  styleUrls: ['./goalie-archives.component.css']
})
export class GoalieArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  inMainPage: boolean = false;

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  seasonType: string = 'Regular';
  currentSeason: string;

  teamString: any;

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [ 
    'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
    'playing_year', 'season_type'
  ];
  goaliesTeamColumnsToDisplay = [ 'playing_year', 'season_type',
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.currentSeason = this._teamsService.currentSeason;
    this.seasonType = this._teamsService.currentSeasonType;
    if (this._route.snapshot.routeConfig.path === "history") {
      this.getStats(this.seasonType);
    } else if (this._route.snapshot.routeConfig.path === "main") {
      // console.log(this._route.snapshot.queryParams.team)
      this.teamString = this._route.snapshot.queryParams.team;
      this.checkString(this.teamString, this.seasonType);
    }
  }

  checkString(team, type) {
    if (team === "STA") {
      this.getKillerBeesStats(team, type);
    } else if (team === "ATL") {
      this.getFlashersStats(team, type);
    } else if (team === "CHY") {
      this.getDesperadosStats(team, type);
    } else if (team === "SCS") {
      this.getStringraysStats(team, type);
    } else if (team === "OAK") {
      this.getAssassinsStats(team, type);
    } else {
      this.inMainPage = true;
      this.getTeamStats(team, type);
    }
  }

  getStats(type) {
    this._teamsService.getGoalieStatsByType(type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
        this.goalies.sort = this.sort;
      }, 350);
    });
  }

  getTeamStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
        this.goalies.sort = this.sort;
      }, 350);
    });
  }

  getKillerBeesStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("MIS", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    });
  }

  getFlashersStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("CHA", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    });
  }

  getDesperadosStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("LVD", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamGoalieStatsByType("SDC", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.goalies = new MatTableDataSource<any[]>(teamStats);
          this.pageSize = 25;
          this.length = teamStats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.goalies.paginator = this.paginator;
            this.goalies.sort = this.sort;
          }, 350);
        });
      });          
    });
  }

  getStringraysStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("SAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    });
  }

  getAssassinsStats(team, type) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    });
  }

  changeSeason(value) {
    if (this._route.snapshot.routeConfig.path === "history") {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.getStats(value);
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.getStats(value);
      }
    } else if (this._route.snapshot.routeConfig.path === "main") {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value);
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value);
      }
    }
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
