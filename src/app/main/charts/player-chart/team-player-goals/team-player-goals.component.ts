import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-team-player-goals',
  templateUrl: './team-player-goals.component.html',
  styleUrls: ['./team-player-goals.component.css']
})
export class TeamPlayerGoalsComponent implements OnInit {

  @Input() playerStats;

  goalLeader: PlayerStat;

  constructor() { }

  ngOnInit() {
    this.goalLeader = this.checkPlayerRank();
    this.playerGoalChart(this.playerStats);
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
    this.playerStats.sort((a,b) => b.goals - a.goals);
    const goalLeader = this.playerStats[0];
    return goalLeader;
  }

  playerGoalChart(stats: PlayerStat[]) {
    
    let labels = [];
    let playersGoalsData = [];
    let colors = [];
    let opacity = "90";

    const data = this.randomizeArray(stats);

    data.forEach( (stat) => {

      if (stat.goals > 0) {
        labels.push(stat['lastname']);

        playersGoalsData.push(stat.goals);
  
        if (stat.player_id === this.goalLeader.player_id) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      }

    });

    const ctx = document.getElementById("playerGoalChart");

    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: playersGoalsData,
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
          text: `Team Goal Leader`,
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