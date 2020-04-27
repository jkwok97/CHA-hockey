import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-players-stats',
  templateUrl: './players-stats.component.html',
  styleUrls: ['./players-stats.component.css']
})
export class PlayersStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  inAllPlayersStats: boolean = false;
  statsLoading: boolean = false;

  stats = [];

  short_team_name: string = '';
  currentSeason: string = '2019-20';
  currentSeasonType: string = 'Regular';

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];
  teamPlayersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    // this.currentSeason = this._teamsService.currentSeason;
    // this.currentSeasonType = this._teamsService.currentSeasonType;
    if (this._route.snapshot.routeConfig.path === "stats/players") {
      this.inAllPlayersStats = true;
      this.getOverallPlayerStats(this.currentSeasonType)
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this.currentSeason = this._teamsService.currentSeason;
        this._teamsService.getTeamPlayerStatsByYearByType(this.short_team_name, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          // console.log(resp);
          let stats = resp as any;
          stats.forEach(player => {
            player.points_per_sixty = ((player.points/player.minutes_played) * 60).toFixed(2);
            this.stats.push(player);
          });
          this.players = new MatTableDataSource<any[]>(this.stats);
          this.length = this.stats.length;
          this.pageSize = 30;
          this.isLoading = false;
          setTimeout(() => {
            this.players.paginator = this.paginator;
          }, 1000);
        }); 
    } 
  }

  getOverallPlayerStats(seasonType) {
    this._teamsService.getPlayerStatsByYearByType(this.currentSeason, seasonType).pipe(
      takeWhile(() => this._alive))
      .subscribe(resp => {
        this.stats = [];
        let stats = resp as any;
        stats.forEach(player => {
          if (player.minutes_played > 0) {
            player.points_per_sixty = ((player.points/player.minutes_played) * 60).toFixed(2);
          } 
          this.stats.push(player);
        });
        this.players = new MatTableDataSource<any[]>(this.stats);
        this.pageSize = 25;
        this.length = this.stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
        }, 1000);
      });
  }

  changeSeason(seasonType) {
    this.isLoading = true;
    this.currentSeasonType = seasonType;
    this.getOverallPlayerStats(this.currentSeasonType);
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
