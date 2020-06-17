import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-team-player-plus-minus',
  templateUrl: './team-player-plus-minus.component.html',
  styleUrls: ['./team-player-plus-minus.component.css']
})
export class TeamPlayerPlusMinusComponent implements OnInit {

  @Input() playerStats;

  plusMinusLeader: PlayerStat;

  constructor() { }

  ngOnInit() {
    this.plusMinusLeader = this.checkPlayerRank();
    this.playerPlusMinusChart(this.playerStats);
  }

  getPlayerPicture(id: number) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  checkPlayerRank() {
    this.playerStats.sort((a,b) => b.plus_minus - a.plus_minus);
    const goalLeader = this.playerStats[0];
    return goalLeader;
  }

  playerPlusMinusChart(stats: PlayerStat[]) {
      let labels = [];
      let playersPlusMinusData = [];
      let colors = [];
      let opacity = "90";

      const data = this.randomizeArray(stats);
      
      data.forEach( (stat) => {

        labels.push(stat['lastname']);
        playersPlusMinusData.push(stat.plus_minus);

        if (stat.player_id === this.plusMinusLeader.player_id) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerPlusMinusChart");

      const chart = new Chart(ctx, {
        type: "polarArea",
        data: {
          datasets: [{
            data: playersPlusMinusData,
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
            text: `Team Plus/Minus Leader`,
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
