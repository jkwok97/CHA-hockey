import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-information-player-table',
  templateUrl: './player-information-player-table.component.html',
  styleUrls: ['./player-information-player-table.component.css']
})
export class PlayerInformationPlayerTableComponent implements OnInit {

  @Input() stats;

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

  shootingPct: string;
  minPerGame: string;

  columns = [
    'team_logo', 'season_type', 'playing_year', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shooting_pct', 'minutes_per_game'
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.stats) {
      this.getPlayerTotals(this.stats);
    }
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

  getLogo(logo) {
    return logo ? logo : '../../../assets/images/cha_logo.jpg'
  }

}
