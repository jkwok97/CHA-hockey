import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-information-goalie-table',
  templateUrl: './player-information-goalie-table.component.html',
  styleUrls: ['./player-information-goalie-table.component.css']
})
export class PlayerInformationGoalieTableComponent implements OnInit {

  @Input() stats;

  totalGamesPlayed: number = 0;
  totalWins: number = 0;
  totalLoss: number = 0;
  totalTies: number = 0;
  totalGA: number = 0;
  totalSA: number = 0;
  totalSO: number = 0;
  totalSaves: number = 0;
  totalMin: number = 0;
  totalPIM: number = 0;

  GAA: string;
  savePCT: string;

  columns = [
    'team_logo', 'season_type', 'playing_year', 'games_played','wins', 'loss', 'ties','goals_against', 'goals_against_avg', 'shots_for', 'save_pct',
    'shutouts', 'penalty_minutes', 'minutes_played'
  ];

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.stats) {
      this.getGoalieTotals(this.stats);
    }
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

}
