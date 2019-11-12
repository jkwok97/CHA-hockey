import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-archives',
  templateUrl: './player-archives.component.html',
  styleUrls: ['./player-archives.component.css']
})
export class PlayerArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  inMainPage: boolean = false;

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [ 'team_logo', 'player_name',
    'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
    'playing_year', 'season_type', 'player_status'
  ];
  playersTeamColumnsToDisplay = [ 'playing_year', 'season_type',
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots', 'player_status'
  ];

  seasonType: string = 'Regular';
  showType: string = 'Season';
  currentSeason: string;

  teamString: any;
  // stats: any

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
    private _router: Router
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
      this._teamsService.getPlayerStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let stats = resp as [];
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                          'playing_year', 'season_type', 'player_status'];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    } else {
      this._teamsService.getPlayerStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let stats = resp['rows'] as [];
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'hits', 'blocked_shots' ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    }
  }

  calcShPct(goals, shots) {
    return ((goals / shots) * 100)
  }

  calcMin(gamesPlayed, minutes) {
    return (minutes / gamesPlayed)
  }

  openPlayer(name, team, position) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    window.scrollTo(0,0);
  }

  getTeamStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp as [];
      this.players = new MatTableDataSource<any[]>(stats);
      this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
      this.playersTeamColumnsToDisplay = [ 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                      'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                      'playing_year', 'season_type', 'player_status'
                                    ];                                
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  getRawTeamStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp['rows'] as [];
      this.players = new MatTableDataSource<any[]>(stats);
      this.playersColumnsToDisplay = [ 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'hits', 'blocked_shots' ];
      this.playersTeamColumnsToDisplay = [ 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals','sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots', 'season_type' ];
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  getKillerBeesStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        console.log(oldTeamStats);
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getKillerBeesRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots' ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getFlashersStats(team, type, group) {
      this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getFlashersRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
    let stats = resp['rows'] as [];
    this._teamsService.getAlltimeTeamPlayerStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let oldTeamStats = resp['rows'] as [];
      oldTeamStats.forEach(element => {
        stats.push(element);
      })
      this.players = new MatTableDataSource<any[]>(stats);
      this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots' ];
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  });
}

  getDesperadosStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamPlayerStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.players = new MatTableDataSource<any[]>(teamStats);
          this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
          this.pageSize = 25;
          this.length = teamStats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.players.paginator = this.paginator;
            this.players.sort = this.sort;
          }, 350);
        });
      });          
    });
  }

  getDesperadosRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamPlayerStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp['rows'] as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.players = new MatTableDataSource<any[]>(teamStats);
          this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots' ];
          this.pageSize = 25;
          this.length = teamStats.length;
          this.isLoading = false;
          setTimeout(() => {
            this.players.paginator = this.paginator;
            this.players.sort = this.sort;
          }, 350);
        });
      });          
    });
  }

  getStringraysStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getStringraysRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots' ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getAssassinsStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
                                        'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots',
                                        'playing_year', 'season_type', 'player_status'
                                      ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    });
  }

  getAssassinsRawStats(team, type, group) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp['rows'] as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp['rows'] as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
        this.playersColumnsToDisplay = [ 'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
                                          'gw_goals', 'gt_goals', 'shots', 'calc_shooting_pct', 'calc_minutes_per_game', 'hits', 'blocked_shots' ];
        this.pageSize = 25;
        this.length = stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
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

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
