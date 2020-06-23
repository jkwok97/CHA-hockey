import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { PlayerStat } from 'src/app/_models/player';
import { ActivatedRoute } from '@angular/router';
import { TeamInfoService } from 'src/app/_services/team-info.service';

@Component({
  selector: 'app-player-archives',
  templateUrl: './player-archives.component.html',
  styleUrls: ['./player-archives.component.css']
})
export class PlayerArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  teamUserId: number;

  columns = [];
  players: MatTableDataSource<any[]>;

  seasonType: string;
  showType: string = 'Season';
  currentSeason: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _playerStatsService: PlayerStatsService,
    private _route: ActivatedRoute,
    private _teamInfoService: TeamInfoService,
  ) {
    this.seasonType = this._currentSeasonService.currentSeasonType;
    this.currentSeason = this._currentSeasonService.currentSeason;
   }

  ngOnInit() {
    this.isLoading = true;

    const teamSelected = this._route.snapshot['_urlSegment'].segments[1].path;

    this.getUserId(teamSelected)

  }

  getUserId(teamSelected: string) {
    this._teamInfoService.getUserByTeamName(teamSelected).pipe(
      takeWhile(() => this._alive)
    ).subscribe((id: number) => {
      this.teamUserId = id['users_id'];
      this.getTeamPlayerStats(this.teamUserId, this.seasonType);
    })
  }

  getTeamPlayerStats(id: number, seasonType: string) {
    this._playerStatsService.getPlayersByUserByType(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.columns = [ 
        'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 
        'penalty_minutes', 'sh_goals','gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 
        'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots','playing_year', 'season_type', 'player_status'
      ];
      this.players = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    })
  }

  getTeamPlayerAllTimeStats(id: number, seasonType: string) {
    this._playerStatsService.getPlayersByUserByShowByType(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.columns = [
        'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 
        'pp_goals', 'sh_goals','gw_goals', 'gt_goals', 'shots', 'hits', 'blocked_shots'
      ]
      playerStats.sort((a,b) => b['points'] - a['points']);
      this.players = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerAllTimeStats(this.teamUserId, value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerStats(this.teamUserId, value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerAllTimeStats(this.teamUserId, value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerStats(this.teamUserId, value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerAllTimeStats(this.teamUserId, this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerAllTimeStats(this.teamUserId, this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerStats(this.teamUserId, this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerStats(this.teamUserId, this.seasonType);
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
