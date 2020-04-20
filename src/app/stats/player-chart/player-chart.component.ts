import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.css']
})
export class PlayerChartComponent implements OnInit {

  @Input() playerStats: any[];

  playerGoalsData = [];
  playerPpGoalsData = [];
  playerAssistsData = [];
  playerPointsData = [];
  playerShGoalsData = [];
  playerPlusMinusData = [];

  goalLeader: any;
  assistLeader: any;
  goalPpLeader: any;
  pointsLeader: any;
  shGoalsLeader: any;
  plusMinusLeader: any;

  constructor() { }

  ngOnInit(): void {
    this.playerGoalChart();
    this.playerAssistChart();
    this.playerPpGoalChart();
    this.playerPointsChart();
    this.playerShgGoalChart();
    this.playerPlusMinusChart();
  }

  checkPlayerRank(type) {
    switch (type) {
      case "goals":
        this.playerStats.sort((a,b) => b.goals - a.goals);
        let goalLeader = this.playerStats[0];
        return goalLeader;
      case "assists":
        this.playerStats.sort((a,b) => b.assists - a.assists);
        let assistLeader = this.playerStats[0];
        return assistLeader;
      case "pp_goals":
        this.playerStats.sort((a,b) => b.pp_goals - a.pp_goals);
        let ppGoalsLeader = this.playerStats[0];
        return ppGoalsLeader;
      case "points":
        this.playerStats.sort((a,b) => b.points - a.points);
        let pointsLeader = this.playerStats[0];
        return pointsLeader;
      case "sh_goals":
        this.playerStats.sort((a,b) => b.sh_goals - a.sh_goals);
        let shGoalsLeader = this.playerStats[0];
        return shGoalsLeader;
      case "plus_minus":
        this.playerStats.sort((a,b) => b.plus_minus - a.plus_minus);
        let plusMinusLeader = this.playerStats[0];
        return plusMinusLeader;
    }
  }

  playerGoalChart() {
    let labels = [];
    let playersGoalsData = [];
    let colors = [];
    let opacity = "90";
    this.goalLeader = this.checkPlayerRank("goals");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersGoalsData.push(player.goals);
        if (player.player_name === this.goalLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerGoalChart");
      let chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [{
            data: playersGoalsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
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
        }
      })
    }, 250);
  }

  playerPpGoalChart() {
    let labels = [];
    let playersPpGoalsData = [];
    let colors = [];
    let opacity = "90";
    this.goalPpLeader = this.checkPlayerRank("pp_goals");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersPpGoalsData.push(player.pp_goals);
        if (player.player_name === this.goalPpLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerPpGoalChart");
      let chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [{
            data: playersPpGoalsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
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
        }
      })
    }, 250);
  }

  playerAssistChart() {
    let labels = [];
    let playersAssistsData = [];
    let colors = [];
    let opacity = "90";
    this.assistLeader = this.checkPlayerRank("assists");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersAssistsData.push(player.assists);
        if (player.player_name === this.assistLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerAssistChart");
      let chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [{
            data: playersAssistsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
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
        }
      })
    }, 250);
  }

  playerPointsChart() {
    let labels = [];
    let playersPointsData = [];
    let colors = [];
    let opacity = "90";
    this.pointsLeader = this.checkPlayerRank("points");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersPointsData.push(player.points);
        if (player.player_name === this.pointsLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerPointsChart");
      let chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [{
            data: playersPointsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
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
        }
      })
    }, 250);
  }

  playerShgGoalChart() {
    let labels = [];
    let playersShgGoalsData = [];
    let colors = [];
    let opacity = "90";
    this.shGoalsLeader = this.checkPlayerRank("sh_goals");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersShgGoalsData.push(player.sh_goals);
        if (player.player_name === this.shGoalsLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerShGoalChart");
      let chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [{
            data: playersShgGoalsData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: `Team Short Handed Goals Leader`,
            fontColor: "white"
          },
          legend: {
            display: false
          },
        }
      })
    }, 250);
  }

  playerPlusMinusChart() {
    let labels = [];
    let playersPlusMinusData = [];
    let colors = [];
    let opacity = "90";
    this.plusMinusLeader = this.checkPlayerRank("plus_minus");
    setTimeout(() => {
      this.playerStats.sort((a,b) => b.player_name - a.player_name);
      this.playerStats.forEach( (player) => {
        labels.push(player.player_name);
        playersPlusMinusData.push(player.plus_minus);
        if (player.player_name === this.plusMinusLeader.player_name) {
          colors.push(("#E53935").concat(opacity))
        } else {
          colors.push(("#3D5AFE").concat(opacity))
        }
      });
      const ctx = document.getElementById("playerPlusMinusChart");
      let chart = new Chart(ctx, {
        type: "polarArea",
        data: {
          datasets: [{
            data: playersPlusMinusData,
            backgroundColor: colors,
            borderColor: colors
          }],
          labels: labels,
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
    }, 1000);
  }

}
