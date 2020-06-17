import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { TeamStat, Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-goals-for',
  templateUrl: './team-goals-for.component.html',
  styleUrls: ['./team-goals-for.component.css']
})
export class TeamGoalsForComponent implements OnInit {

  @Input() stats: TeamStat[];
  @Input() userTeam: Team;

  goalsForAvg: string;
  goalsForRank: string;
  totalTeams: string;

  constructor() { }

  ngOnInit() {
    const stats = this.randomizeArray(this.stats);
    const team = this.stats.find((stat: TeamStat) => stat.team_id === this.userTeam.id);

    this.goalsForAvg = (team.goals_for / team.games_played).toFixed(2);
    this.goalsForRank = this.checkRank();
    this.goalsForChart(this.userTeam.nickname, stats);
  }

  goalsForChart(teamName: string, stats: TeamStat[]) {
    let labels = [];
    let colors = [];
    let goalsForData = [];
    let opacity = "90"

    stats.forEach( (team) => {

      labels.push(team['nickname']);
      goalsForData.push((team.goals_for / team.games_played).toFixed(2));

      if (team['nickname'] === teamName) {

        colors.push(("#E53935").concat(opacity))
        team['goals_for_avg'] = (team.goals_for / team.games_played).toFixed(2);

      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
    });
    const ctx = document.getElementById("goalsForChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: goalsForData,
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
          text: `Goals For/Game Compared To League`,
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

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  checkRank() {

    const stats = this.stats.map((stat:TeamStat) => ({
      ...stat,
      goals_for_avg: (stat.goals_for / stat.games_played)
    }));

    const data = this.sortRanks(stats, 'goals_for_avg');
    const index = data.findIndex(team => team['nickname'] === this.userTeam.nickname);

    return (index+1).toString();
  }

  sortRanks(array, category) {    
    array.sort((a,b) => Number(b[category]) - Number(a[category]));
    this.totalTeams = array.length;
    return array;
  }

}
