import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isPlayerGoalie: boolean = false;
  isLoading: boolean = false;

  allPlayersInfo: any[];
  playerInfo: any;
  playerStatsFetched: any;

  totalGamesPlayed: number = 0;
  totalGoals: number = 0;
  totalAssists: number = 0;
  totalPoints: number = 0;
  totalPlusMinus: number = 0;
  totalPIM: number = 0;
  totalPPG: number = 0;
  totalSHG: number = 0;
  totalGWG: number = 0;
  totalGTG: number = 0;
  totalShots: number = 0;
  totalMin: number = 0;
  
  totalWins: number = 0;
  totalLoss: number = 0;
  totalTies: number = 0;
  totalGA: number = 0;
  totalSA: number = 0;
  totalSO: number = 0;
  totalSaves: number = 0;

  shootingPct: string;
  minPerGame: string;
  GAA: string;
  savePCT: string;
  player: string;
  position: string;
  hits: string;
  seasonType: string = 'Regular';

  playerStats: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'season_type', 'playing_year', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shooting_pct', 'minutes_per_game'
  ];

  goalieColumnsToDisplay = [
    'team_logo', 'season_type', 'playing_year', 'games_played','wins', 'loss', 'ties','goals_against', 'goals_against_avg', 'shots_for', 'save_pct',
    'shutouts', 'penalty_minutes', 'minutes_played'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) {
    this._teamsService.getPlayerInfo().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.allPlayersInfo = resp as [];
      console.log(this.allPlayersInfo);
    });
    this.position = this._teamsService.playerPosition;
    this.hits = this._teamsService.playerHits;
    if ((!this.position && !this.hits) || this.position === "G") {
      this.isPlayerGoalie = true;
      this._teamsService.getAllIndividualGoalieStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.playerStatsFetched = resp as [];
        this.playerInfo = resp as [];
        if (this.allPlayersInfo) {
          this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
        }
        this.playerInfo.team = this.findLogo(this.playerInfo[0].team_name);
        this.getGoalieTotals(this.playerStatsFetched)
        this.playerStats = new MatTableDataSource<any[]>(this.playerStatsFetched);
        setTimeout(() => {
          this.playerStats.sort = this.sort;
        })
      });
    } else {
      this._teamsService.getAllIndividualPlayerStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.playerInfo = resp as [];
        this.playerStatsFetched = resp as [];
        if (this.allPlayersInfo) {
          this.playerInfo.picture = this.allPlayersInfo.find( player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
        }
        this.playerInfo.team = this.findLogo(this.playerInfo[0].team_name);
        this.getPlayerTotals(this.playerStatsFetched);
        this.playerStats = new MatTableDataSource<any[]>(this.playerStatsFetched);
        setTimeout(() => {
          this.playerStats.sort = this.sort;
        })
      });
    }
  }

  ngOnInit() {
    this.player = this.splitName(this._route.snapshot.params.params);
   
  }

  getGoalieTotals(allStats) {
    allStats.forEach(year => {
      this.totalGamesPlayed += Number(year.games_played);
      this.totalWins += Number(year.wins);
      this.totalLoss += Number(year.loss);
      this.totalTies += Number(year.ties);
      this.totalGA += Number(year.goals_against);
      this.totalSA += Number(year.shots_for);
      this.totalSO += Number(year.shutouts);
      this.totalPIM += Number(year.penalty_minutes);
      this.totalMin += Number(year.minutes_played);
      this.totalSaves += Number(year.saves);
    });
    this.GAA = ((this.totalGA*60) / this.totalMin).toFixed(2);
    this.savePCT = (this.totalSaves / this.totalSA).toFixed(3);
  }

  getPlayerTotals(allStats) {
    allStats.forEach(year => {
      this.totalGamesPlayed += Number(year.games_played);
      this.totalGoals += Number(year.goals);
      this.totalAssists += Number(year.assists);
      this.totalPoints += Number(year.points);
      this.totalPlusMinus += Number(year.plus_minus);
      this.totalPIM += Number(year.penalty_minutes);
      this.totalPPG += Number(year.pp_goals);
      this.totalSHG += Number(year.sh_goals);
      this.totalGWG += Number(year.gw_goals);
      this.totalGTG += Number(year.gt_goals);
      this.totalShots += Number(year.shots);
      this.totalMin += Number(year.minutes_played);
    });
    this.shootingPct = ((this.totalGoals / this.totalShots) * 100).toFixed(1);
    this.minPerGame = (this.totalMin / this.totalGamesPlayed).toFixed(1);
  }

  changeSeason(value) {
    if (this.isPlayerGoalie) {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.resetValues();
        this.getGoalieStats(value);
        
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.resetValues();
        this.getGoalieStats(value);
      }
    } else {
      if (value === 'Playoffs') {
        this.isLoading = true;
        this.seasonType = value;
        this.resetValues();
        this.getPlayerStats(value);
        
      } else {
        this.isLoading = true;
        this.seasonType = value;
        this.resetValues();
        this.getPlayerStats(value);
      }
    }
  }

  getGoalieStats(type) {
    this._teamsService.getAllIndividualGoalieStatsByType(this._route.snapshot.params.params, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.playerStatsFetched = resp as [];
      this.getGoalieTotals(this.playerStatsFetched);
      this.playerStats = new MatTableDataSource<any[]>(this.playerStatsFetched);
    });
  }

  getPlayerStats(type) {
    this._teamsService.getAllIndividualPlayerStatsByType(this._route.snapshot.params.params, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.playerStatsFetched = resp as [];
      this.getPlayerTotals(this.playerStatsFetched);
      this.playerStats = new MatTableDataSource<any[]>(this.playerStatsFetched);
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

  splitName(name) {
    return name.split(", ");
  }

  onTabChange(event) {
    console.log(event);
  }

  resetValues() {
    this.totalGamesPlayed = 0;
    this.totalGoals = 0;
    this.totalAssists = 0;
    this.totalPoints = 0;
    this.totalPlusMinus = 0;
    this.totalPIM = 0;
    this.totalPPG = 0;
    this.totalSHG = 0;
    this.totalGWG = 0;
    this.totalGTG = 0;
    this.totalShots = 0;
    this.totalMin = 0;
    this.totalWins = 0;
    this.totalLoss = 0;
    this.totalTies = 0;
    this.totalGA = 0;
    this.totalSA = 0;
    this.totalSO = 0;
    this.totalSaves = 0;
  }

  ngOnDestroy() {
    this._alive = false;
    this.resetValues();
  }

}
