import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { TeamStat, Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-points',
  templateUrl: './team-points.component.html',
  styleUrls: ['./team-points.component.css']
})
export class TeamPointsComponent implements OnInit {

  @Input() stats: TeamStat[];
  @Input() userTeam: Team;

  points: number;
  pointsRank: string;
  totalTeams: string;

  constructor() { }

  ngOnInit() {
    const stats = this.randomizeArray(this.stats);
    this.points = this.stats.find((stat: TeamStat) => stat.team_id === this.userTeam.id).points;
    this.pointsChart(this.userTeam.nickname, stats);
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  pointsChart(teamName, stats: TeamStat[]) {
    let colors = [];
    const opacity = '90';

    const labels = stats.map(stat => stat['nickname']);
    const pointsData = stats.map(stat => stat.points);

    stats.forEach( (stat) => {
      if (stat['nickname'] === teamName) {
        colors.push(('#E53935').concat(opacity))
        setTimeout(() => {
          this.pointsRank = this.checkRank(teamName);
        }, 300);
      } else {
        colors.push(('#3D5AFE').concat(opacity))
      }
    });
    const ctx = document.getElementById("pointsChart");
    const chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: pointsData,
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
          text: `Points Compared To League`,
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

  checkRank(teamName) {
    const pointData = this.sortRanks(this.stats, 'points');
    const index = pointData.findIndex(team => team['nickname'] === this.userTeam.nickname);
    return (index+1).toString();
  }

  sortRanks(array, category) {    
    array.sort((a,b) => Number(b[category]) - Number(a[category]));
    this.totalTeams = array.length;
    return array;
  }

}
