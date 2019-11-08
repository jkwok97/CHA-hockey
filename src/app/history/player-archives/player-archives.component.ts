import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  playersColumnsToDisplay = [ 'playing_year', 'season_type',
    'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];
  playersTeamColumnsToDisplay = [ 'playing_year', 'season_type',
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  seasonType: string = 'Regular';
  showType: string = 'Season';
  currentSeason: string;

  teamString: any;

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
    this._teamsService.getPlayerStatsByType(type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      this.players = new MatTableDataSource<any[]>(stats);
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  getTeamStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp as [];
      this.players = new MatTableDataSource<any[]>(stats);
      this.pageSize = 25;
      this.length = stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  getKillerBeesStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("MIS", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
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

  getFlashersStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("CHA", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
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

  getDesperadosStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("LVD", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamPlayerStatsByType("SDC", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          this.players = new MatTableDataSource<any[]>(teamStats);
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

  getStringraysStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("SAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
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

  getAssassinsStats(team, type) {
    this._teamsService.getAlltimeTeamPlayerStatsByType(team, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let stats = resp as [];
      this._teamsService.getAlltimeTeamPlayerStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          stats.push(element);
        })
        this.players = new MatTableDataSource<any[]>(stats);
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

  changeShow(value) {
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
      if (value === 'Alltime') {
        this.isLoading = true;
        this.showType = value;
        
      } else {
        this.isLoading = true;
        this.showType = value;
        console.log(this.players);
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
