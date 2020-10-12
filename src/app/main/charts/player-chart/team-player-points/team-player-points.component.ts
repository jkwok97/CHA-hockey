import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-team-player-points',
  templateUrl: './team-player-points.component.html',
  styleUrls: ['./team-player-points.component.css']
})
export class TeamPlayerPointsComponent implements OnInit {

  @Input() playerStats;

  pointsLeader: PlayerStat;

  constructor() { }

  ngOnInit() {
    this.pointsLeader = this.checkPlayerRank();
    this.playerPointsChart(this.playerStats);
  }

  getPlayerPicture(id: number) {
    return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}@2x.jpg`
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  checkPlayerRank() {
    this.playerStats.sort((a,b) => b.points - a.points);
    const leader = this.playerStats[0];
    return leader;
  }

  playerPointsChart(stats: PlayerStat[]) {
      let labels = [];
      let playersPointsData = [];
      let colors = [];
      let opacity = "90";

      const data = this.randomizeArray(stats);
      
      data.forEach( (stat) => {

        if (stat.points > 0) {
          labels.push(stat['lastname']);
          playersPointsData.push(stat.points);

          if (stat.player_id === this.pointsLeader.player_id) {
            colors.push(("#E53935").concat(opacity))
          } else {
            colors.push(("#3D5AFE").concat(opacity))
          }
        }

      });
      const ctx = document.getElementById("playerPointsChart");

      const chart = new Chart(ctx, {
        type: "polarArea",
        data: {
          datasets: [{
            data: playersPointsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
        },
        arc: {
          backgroundColor: "white",
          borderColor: "white"
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: `Team Points Leader`,
            fontColor: "white"
          },
          legend: {
            display: false
          },
          scale: {
            ticks: {
              fontColor: "white",
              showLabelBackdrop: false
            },
            pointLabels: {
              fontColor: "white"
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        }
      })
    }
}
