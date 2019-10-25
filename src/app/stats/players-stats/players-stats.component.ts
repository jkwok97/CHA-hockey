import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players-stats',
  templateUrl: './players-stats.component.html',
  styleUrls: ['./players-stats.component.css']
})
export class PlayersStatsComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;

  stats: any[];

  short_team_name: string = '';

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;
    if (this._route.snapshot.routeConfig.path === "stats/players") {
      this._teamsService.getPlayerStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
        this.stats = resp as [];
        this.players = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;
      });
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamPlayerStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
        this.stats = resp as [];
        this.players = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;  
      });
    }
    setTimeout(() => {
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    }, 250);
    
  }

}