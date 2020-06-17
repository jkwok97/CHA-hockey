import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { TeamStat, Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-goals-diff',
  templateUrl: './team-goals-diff.component.html',
  styleUrls: ['./team-goals-diff.component.css']
})
export class TeamGoalsDiffComponent implements OnInit {

  @Input() stats: TeamStat[];
  @Input() userTeam: Team;

  goalDiff: number;
  goalDiffRank: string;
  totalTeams: string;

  constructor() { }

  ngOnInit() {
    const stats = this.randomizeArray(this.stats);
    const team = this.stats.find((stat: TeamStat) => stat.team_id === this.userTeam.id);

    this.goalDiff = team.goals_for - team.goals_against;
    this.goalDiffRank = this.checkRank();
    this.goalDiffChart(this.userTeam.nickname, stats);
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  goalDiffChart(teamName: string, stats: TeamStat[]) {
    let labels = [];
    let colors = [];
    let goalDiffData = [];
    let opacity = "90";

    stats.forEach( (team) => {

      labels.push(team['nickname']);
      goalDiffData.push(team.goals_for - team.goals_against);

      if (team['nickname'] === teamName) {
        colors.push(("#E53935").concat(opacity));
        team['goal_diff'] = team.goals_for - team.goals_against;
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
      
    });


    const ctx = document.getElementById("goalDiffChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: goalDiffData,
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
          text: `Goal Differential Compared To League`,
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

  checkRank() {

    const stats = this.stats.map((stat:TeamStat) => ({
      ...stat,
      goal_diff: stat.goals_for - stat.goals_against
    }));

    const data = this.sortRanks(stats, 'goal_diff');
    const index = data.findIndex(team => team['nickname'] === this.userTeam.nickname);
    
    return (index+1).toString();
  }

  sortRanks(array, category) {    
    array.sort((a,b) => Number(b[category]) - Number(a[category]));
    this.totalTeams = array.length;
    return array;
  }

}
