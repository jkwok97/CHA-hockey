import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-team-player-assists',
  templateUrl: './team-player-assists.component.html',
  styleUrls: ['./team-player-assists.component.css']
})
export class TeamPlayerAssistsComponent implements OnInit {

  @Input() playerStats;

  assistLeader: PlayerStat;

  constructor() { }

  ngOnInit() {
    this.assistLeader = this.checkPlayerRank();
    this.playerAssistChart(this.playerStats);
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
    this.playerStats.sort((a,b) => b.assists - a.assists);
    const leader = this.playerStats[0];
    return leader;
  }

  playerAssistChart(stats: PlayerStat[]) {
    let labels = [];
    let playersAssistsData = [];
    let colors = [];
    let opacity = "90";

    const data = this.randomizeArray(stats);
    
    data.forEach( (stat) => {

      if (stat.assists > 0) {
        labels.push(stat['lastname']);
        playersAssistsData.push(stat.assists);
  
        if (stat.player_id === this.assistLeader.player_id) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      }

    });

    const ctx = document.getElementById("playerAssistChart");

    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: playersAssistsData,
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
          text: `Team Assists Leader`,
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
