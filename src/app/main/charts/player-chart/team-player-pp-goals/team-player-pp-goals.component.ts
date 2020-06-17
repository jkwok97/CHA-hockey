import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-team-player-pp-goals',
  templateUrl: './team-player-pp-goals.component.html',
  styleUrls: ['./team-player-pp-goals.component.css']
})
export class TeamPlayerPpGoalsComponent implements OnInit {

  @Input() playerStats;

  goalPpLeader: PlayerStat;

  constructor() { }

  ngOnInit() {
    this.goalPpLeader = this.checkPlayerRank();
    this.playerPpGoalChart(this.playerStats);
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
    this.playerStats.sort((a,b) => b.pp_goals - a.pp_goals);
    const leader = this.playerStats[0];
    return leader;
  }

  playerPpGoalChart(stats: PlayerStat[]) {
    let labels = [];
    let playersPpGoalsData = [];
    let colors = [];
    let opacity = "90";

    const data = this.randomizeArray(stats);

    data.forEach( (stat) => {

      if (stat.pp_goals > 0) {
        labels.push(stat['lastname']);

        playersPpGoalsData.push(stat.pp_goals);
  
        if (stat.player_id === this.goalPpLeader.player_id) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      }

    });

    const ctx = document.getElementById("playerPpGoalChart");

    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: playersPpGoalsData,
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
          text: `Team PP Goal Leader`,
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
