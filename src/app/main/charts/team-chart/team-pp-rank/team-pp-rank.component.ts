import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { TeamStat, Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-pp-rank',
  templateUrl: './team-pp-rank.component.html',
  styleUrls: ['./team-pp-rank.component.css']
})
export class TeamPpRankComponent implements OnInit {

  @Input() stats: TeamStat[];
  @Input() userTeam: Team;

  ppPct: string;
  ppRank: string;
  totalTeams: string;

  constructor() { }

  ngOnInit() {
    const stats = this.randomizeArray(this.stats);
    const team = this.stats.find((stat: TeamStat) => stat.team_id === this.userTeam.id);

    this.ppPct = ((team.pp_goals / team.pp_attempts) * 100).toFixed(1);
    this.ppRank = this.checkRank();
    this.ppPctChart(this.userTeam.nickname, stats);
  }

  ppPctChart(teamName: string, stats: TeamStat[]) {
    let labels = [];
    let colors = [];
    let ppPctData = [];
    let opacity = "90"

    stats.forEach( (team) => {

      labels.push(team['nickname']);
      ppPctData.push(((team.pp_goals / team.pp_attempts) * 100).toFixed(1));

      if (team['nickname'] === teamName) {
        colors.push(("#E53935").concat(opacity))
        team['pp_pct'] = ((team.pp_goals / team.pp_attempts) * 100).toFixed(1);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }

    });

    const ctx = document.getElementById("ppChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: ppPctData,
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
          text: `PP Pct Compared To League`,
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
      pp_pct: (stat.pp_goals / stat.pp_attempts) * 100
    }));

    const data = this.sortRanks(stats, 'pp_pct');
    const index = data.findIndex(team => team['nickname'] === this.userTeam.nickname);

    return (index+1).toString();
  }

  sortRanks(array, category) {    
    array.sort((a,b) => Number(b[category]) - Number(a[category]));
    this.totalTeams = array.length;
    return array;
  }

}
