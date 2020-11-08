import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-team-ratings-player',
  templateUrl: './team-ratings-player.component.html',
  styleUrls: ['./team-ratings-player.component.css']
})
export class TeamRatingsPlayerComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  season: string;

  statRatings: any[];

  playersRateColumns = [ 'player_name',
    'c_rate', 'l_rate', 'r_rate', 'ld_rate', 'rd_rate', 'skating', 'speed', 'passing',
    'shooting', 'face_off', 'forecheck', 'assist_rating', 'clear_crease', 'shot_block', 'pk', 'physical',
    'rock', 'intimidation', 'game_fatigue', 'shift_fatigue'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _currentSeasonService: CurrentSeasonService,
    private _playerService: PlayerService
  ) { 
    // this.season = this._currentSeasonService.currentSeason;
    this.season = '2020-21';
  }

  ngOnInit() {
    this.isLoading = true;
    const teamName = this._route.snapshot.parent.params.team;
    this.getTeamPlayerRatings(teamName, this.season);
  }

  getTeamPlayerRatings(teamName: string, season: string) {
    this._playerService.getTeamPlayerRatings(teamName, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.statRatings = ratings;
      this.isLoading = false;
    })
  }

}
