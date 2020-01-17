import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  stats = [];

  short_team_name: string = '';
  currentSeason: string;
  currentSeasonType: string;

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
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.currentSeason = this._teamsService.currentSeason;
    this.currentSeasonType = this._teamsService.currentSeasonType;
    if (this._route.snapshot.routeConfig.path === "stats/players") {
      this.inAllPlayersStats = true;
      this._teamsService.getPlayerStatsByYearByType(this.currentSeason,this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let stats = resp as any;
        stats.forEach(player => {
          if (player.minutes_played > 0) {
            player.points_per_sixty = ((player.points/player.minutes_played) * 60).toFixed(2);
            this.stats.push(player);
          }
        });
        this.players = new MatTableDataSource<any[]>(this.stats);
        this.pageSize = 25;
        this.length = this.stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.players.sort = this.sort;
        }, 350);
      });
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
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
            this.players.sort = this.sort;
          }, 350);
        }); 
    } 
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
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

  openPlayer(player, type) {
    this._router.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
