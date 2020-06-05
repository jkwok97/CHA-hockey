import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

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
  pageSize: number = 25;
  length: number = 0;

  seasonType: string = 'Regular';
  showType: string = 'Season';
  currentSeason: string;

  teamString: any;

  goalies: MatTableDataSource<any[]>;
  
  goaliesColumnsToDisplay = [ 
    'team_logo', 'player_name', 'games_played','wins','loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
    'playing_year', 'season_type', 'player_status'
  ];
  goaliesColumnsToDisplayForAllTime = [ 
    'player_name', 'games_played','wins','loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes','season_type',
  ];
  goaliesTeamColumnsToDisplay = [ 'team_logo', 'playing_year', 'season_type',
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'player_status'
  ];
  goaliesTeamColumnsToDisplayForAllTime = [ 'season_type',
    'player_name', 'games_played','minutes_played', 'calc_goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'calc_save_pct', 'goals', 'assists', 'points', 'penalty_minutes'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService, 
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.currentSeason = this._teamsService.currentSeason;
    this.seasonType = this._teamsService.currentSeasonType;
    if (this._route.snapshot.routeConfig.path === "history") {
      this.getStats(this.seasonType, this.showType);
    } else if (this._route.snapshot.routeConfig.path === "main") {
      this.teamString = this._route.snapshot.queryParams.team;
      this.checkString(this.teamString, this.seasonType, this.showType);
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
      this.teamString = this._route.snapshot.params.params;
      this.checkString(this.teamString, this.seasonType, this.showType);
    }
  }

  checkString(team, type, group) {
    if (group === "Season") {
      if (team === "STA") {
        this.getKillerBeesStats(team, type, group);
      } else if (team === "ATL") {
        this.getFlashersStats(team, type, group);
      } else if (team === "CHY") {
        this.getDesperadosStats(team, type, group);
      } else if (team === "SCS") {
        this.getStringraysStats(team, type, group);
      } else if (team === "OAK") {
        this.getAssassinsStats(team, type, group);
      } else {
        this.inMainPage = true;
        this.getTeamStats(team, type, group);
      }
    } else if (group === "Alltime") {
      if (team === "STA") {
        this.getKillerBeesRawStats(team, type, group);
      } else if (team === "ATL") {
        this.getFlashersRawStats(team, type, group);
      } else if (team === "CHY") {
        this.getDesperadosRawStats(team, type, group);
      } else if (team === "SCS") {
        this.getStringraysRawStats(team, type, group);
      } else if (team === "OAK") {
        this.getAssassinsRawStats(team, type, group);
      } else {
        this.inMainPage = true;
        this.getRawTeamStats(team, type, group);
      }
    }
  }

  getStats(type, group) {
    if (group === "Season") {
      this._teamsService.getGoalieStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let stats = resp as [];
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    } else {
      this._teamsService.getGoalieStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let stats = resp['rows'] as [];
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    }
    
  }

  getTeamStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
      }, 350);
    });
  }

  getRawTeamStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp['rows'] as [];
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
      }, 350);
    });
  }

  getKillerBeesStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getKillerBeesRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getFlashersStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getFlashersRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getDesperadosStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamGoalieStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.goalies = new MatTableDataSource<any[]>(teamStats);
          this.length = teamStats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.goalies.paginator = this.paginator;
          }, 350);
        });
      });          
    });
  }

  getDesperadosRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamGoalieStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp['rows'] as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.goalies = new MatTableDataSource<any[]>(teamStats);
          this.length = teamStats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.goalies.paginator = this.paginator;
          }, 350);
        });
      });          
    });
  }

  getStringraysStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getStringraysRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamGoalieStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    });
  }

  getAssassinsStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      if (type === "Regular") {
        this._teamsService.getAlltimeTeamGoalieStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            stats.push(element);
          })
          this.goalies = new MatTableDataSource<any[]>(stats);
          this.length = stats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.goalies.paginator = this.paginator;
          }, 350);
        });
      } else {
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      }
    });
  }

  getAssassinsRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      if (type === "Regular") {
        this._teamsService.getAlltimeTeamGoalieStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp['rows'] as [];
          oldTeamStats.forEach(element => {
            stats.push(element);
          })
          this.goalies = new MatTableDataSource<any[]>(stats);
          this.length = stats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.goalies.paginator = this.paginator;
          }, 350);
        });
      } else {
        this.goalies = new MatTableDataSource<any[]>(stats);
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      }
    });
  }

  changeSeason(value) {
    if (this._route.snapshot.routeConfig.path === "history") {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.getStats(value, this.showType);
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.getStats(value, this.showType);
      }
    } else if (this._route.snapshot.routeConfig.path === "main") {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value, this.showType);
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value, this.showType);
      }
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value, this.showType);
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.checkString(this.teamString, value, this.showType);
      }
    }
  }

  changeShow(value) {
    if (this._route.snapshot.routeConfig.path === "history") {
      if (value === 'Alltime') {
        this.isLoading = true;
        this.showType = value;
        this.getStats(this.seasonType, value);
      } else {
        this.isLoading = true;
        this.showType = value;
        this.getStats(this.seasonType, value);
      }
    } else if (this._route.snapshot.routeConfig.path === "main") {
      if (value === 'Alltime') {
        this.isLoading = true;
        this.showType = value;
        this.checkString(this.teamString, this.seasonType, value);
      } else {
        this.isLoading = true;
        this.showType = value;
        this.checkString(this.teamString, this.seasonType, value);
      }
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
      if (value === 'Alltime') {
        this.isLoading = true;
        this.showType = value;
        this.checkString(this.teamString, this.seasonType, value);
      } else {
        this.isLoading = true;
        this.showType = value;
        this.checkString(this.teamString, this.seasonType, value);
      }
    }
  }

  columnsToDisplay() {
    if (this.teamString && this.showType === 'Season') {
      return this.goaliesTeamColumnsToDisplay
    } else if (this.teamString && this.showType === 'Alltime') {
      return this.goaliesTeamColumnsToDisplayForAllTime
    } else if (!this.teamString && this.showType === 'Season') {
      return this.goaliesColumnsToDisplay
    } else if (!this.teamString && this.showType === 'Alltime') {
      return this.goaliesColumnsToDisplayForAllTime
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
