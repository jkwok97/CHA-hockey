import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-team-ratings-goalie',
  templateUrl: './team-ratings-goalie.component.html',
  styleUrls: ['./team-ratings-goalie.component.css']
})
export class TeamRatingsGoalieComponent implements OnInit {
  
  private _alive: boolean = true;
  isLoading: boolean = false;

  season: string;

  goalieStatRatings: any[];

  goalieRateColumns = [
    'player_name', 'passing', 'skating', 'speed'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _currentSeasonService: CurrentSeasonService,
    private _playerService: PlayerService
  ) { 
    this.season = this._currentSeasonService.currentSeason;
    // this.season = '2020-21';
  }

  ngOnInit() {
    this.isLoading = true;
    const teamName = this._route.snapshot.parent.params.team;
    this.getTeamGoalieRatings(teamName, this.season);

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeWhile(() => this._alive)
    ).subscribe((event) => {
      this.isLoading = true;
      const splitUrl = event['url'].split("/");
      this.getTeamGoalieRatings(splitUrl[2], this.season);
    });
  }

  getTeamGoalieRatings(teamName: string, season: string) {
    this._playerService.getTeamGoalieRatings(teamName, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.goalieStatRatings = ratings;
      this.isLoading = false;
    })
  }

}
