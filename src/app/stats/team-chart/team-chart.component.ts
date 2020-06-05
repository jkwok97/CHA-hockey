import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-team-chart',
  templateUrl: './team-chart.component.html',
  styleUrls: ['./team-chart.component.css']
})
export class TeamChartComponent implements OnInit {

  @Input() stats: any[];
  @Input() team: Team;

  pointsRank: string;
  goalDiffRank: string;
  shotDiffRank: string;
  winPctRank: string;
  ppRank: string;
  pkRank: string;
  goalsForRank: string;
  goalsAgainstRank: string;
  totalTeams: string;

  goalDiffData = [];
  shotDiffData = [];
  winPctData = [];
  ppPctData = [];
  pkPctData = [];
  goalsForData = [];
  goalsAgainstData = [];

  constructor() { }

  ngOnInit() {
    this.pointsChart(this.team.shortname);
    this.goalDiffChart(this.team.shortname);
    // this.shotDiffChart(this.team.shortname);
    // this.winPctChart(this.team.shortname);
    // this.ppPctChart(this.team.shortname);
    // this.pkPctChart(this.team.shortname);
    // this.goalsForChart(this.team.shortname);
    // this.goalsAgainstChart(this.team.shortname);
  }

  checkRank(type, teamName, stat) {
    switch (type) {
      case "points":
        const pointData = this.sortRanks(this.stats, 'points');
        let index = pointData.findIndex(team => team.team_name === teamName);
        return (index+1).toString();
      case "goal_diff":
        const goalData = this.sortRanks(this.goalDiffData, 'goal_diff');
        let goalDiffIndex = goalData.findIndex(team => team.team === teamName);
        return (goalDiffIndex+1).toString();
      case "shot_diff":
        const shotData = this.sortRanks(this.shotDiffData, 'shot_diff');
        let shotDiffIndex = shotData.findIndex(team => team.team === teamName);
        return (shotDiffIndex+1).toString();
      case "win_pct":
        const winData = this.sortRanks(this.winPctData, 'win_pct');
        let winPctIndex = winData.findIndex(team => team.team === teamName);
        return (winPctIndex+1).toString();
      case "pp_pct":
        const ppData = this.sortRanks(this.ppPctData, 'pp_pct');
        let ppPctIndex = ppData.findIndex(team => team.team === teamName);
        return (ppPctIndex+1).toString();
      case "pk_pct":
        const pkData = this.sortRanks(this.pkPctData, 'pk_pct')
        let pkPctIndex = pkData.findIndex(team => team.team === teamName);
        return (pkPctIndex+1).toString();
      case "goals_for_avg":
        const data = this.sortRanks(this.goalsForData, 'goals_for_avg');
        let goalsForIndex = data.findIndex(team => team.team === teamName);
        return (goalsForIndex+1).toString();
      case "goals_against_avg":
        const gaData = this.sortRanks(this.goalsAgainstData, 'goals_against_avg');
        let goalsAgainstIndex = gaData.findIndex(team => team.team === teamName);
        return (goalsAgainstIndex+1).toString();
    }
  }

  sortRanks(array, category) {
    const data = array.map(element => Number(element[category]));
    data.sort((a,b) => Number(b[category]) - Number(a[category]));
    this.totalTeams = data.length;
    return data;
  }

  pointsChart(teamName) {
    let colors = [];
    let opacity = '90';

    const labels = this.stats.map(stat => stat.team_name);
    const pointsData = this.stats.map(stat => stat.points);

    this.stats.forEach( (stat) => {
      if (stat.team_name === teamName) {
        colors.push(('#E53935').concat(opacity))
        setTimeout(() => {
          this.pointsRank = this.checkRank('points', teamName, stat.points);
        }, 300);
      } else {
        colors.push(('#3D5AFE').concat(opacity))
      }
    });
    const ctx = document.getElementById("pointsChart");
    let chart = new Chart(ctx, {
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

  goalDiffChart(teamName) {
    let colors = [];
    let opacity = "90";

    const labels = this.stats.map(stat => stat.team_name);
    const goalDiffData = this.stats.map(stat => ({
      team: stat.team_name,
      goal_diff: stat.goals_for - stat.goals_against
    }));

    this.stats.forEach( (team) => {
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity));
        team.goal_diff = team.goals_for - team.goals_against;
        setTimeout(() => {
          this.goalDiffRank = this.checkRank('goal_diff', teamName, team.goal_diff);
        }, 300);
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

  // shotDiffChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let shotDiffData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     shotDiffData.push(team.shots_for - team.shots_against);
  //     this.shotDiffData.push({team: team.team_name, shot_diff: (team.shots_for-team.shots_against)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.shot_diff = team.shots_for - team.shots_against;
  //       setTimeout(() => {
  //         this.shotDiffRank = this.checkRank("shot_diff", teamName, this.team.shot_diff);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("shotDiffChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: shotDiffData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `Shot Differential Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

  // winPctChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let winPctData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     winPctData.push(((team.wins / team.games_played) * 100).toFixed(1));
  //     this.winPctData.push({team: team.team_name, win_pct: ((team.wins / team.games_played) * 100).toFixed(1)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.win_pct = ((team.wins / team.games_played) * 100).toFixed(1);
  //       setTimeout(() => {
  //         this.winPctRank = this.checkRank("win_pct", teamName, this.team.win_pct);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("winPctChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: winPctData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `Win Pct Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

  // ppPctChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let ppPctData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     ppPctData.push(((team.pp_goals / team.pp_attempts) * 100).toFixed(1));
  //     this.ppPctData.push({team: team.team_name, pp_pct: ((team.pp_goals / team.pp_attempts) * 100).toFixed(1)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.pp_pct = ((team.pp_goals / team.pp_attempts) * 100).toFixed(1);
  //       setTimeout(() => {
  //         this.ppRank = this.checkRank("pp_pct", teamName, this.team.pp_pct);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("ppChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: ppPctData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `PP Pct Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

  // pkPctChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let pkPctData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     pkPctData.push((((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1));
  //     this.pkPctData.push({team: team.team_name, pk_pct: (((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.pk_pct = (((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1);
  //       setTimeout(() => {
  //         this.pkRank = this.checkRank("pk_pct", teamName, this.team.pk_pct);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("pkChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: pkPctData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `PK Pct Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

  // goalsForChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let goalsForData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     goalsForData.push((team.goals_for / team.games_played).toFixed(2));
  //     this.goalsForData.push({team: team.team_name, goals_for_avg: (team.goals_for / team.games_played).toFixed(2)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.goals_for_avg = (team.goals_for / team.games_played).toFixed(2);
  //       setTimeout(() => {
  //         this.goalsForRank = this.checkRank("goals_for_avg", teamName, this.team.goals_for_avg);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("goalsForChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: goalsForData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `Goals For/Game Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

  // goalsAgainstChart(teamName) {
  //   let labels = [];
  //   let colors = [];
  //   let goalsAgainstData = [];
  //   let opacity = "90"
  //   this.stats.forEach( (team) => {
  //     labels.push(team.team_name);
  //     goalsAgainstData.push((team.goals_against / team.games_played).toFixed(2));
  //     this.goalsAgainstData.push({team: team.team_name, goals_against_avg: (team.goals_against / team.games_played).toFixed(2)})
  //     if (team.team_name === teamName) {
  //       colors.push(("#E53935").concat(opacity))
  //       this.team.goals_against_avg = (team.goals_against / team.games_played).toFixed(2);
  //       setTimeout(() => {
  //         this.goalsAgainstRank = this.checkRank("goals_against_avg", teamName, this.team.goals_against_avg);
  //       }, 300);
  //     } else {
  //       colors.push(("#3D5AFE").concat(opacity))
  //     }
  //   });
  //   const ctx = document.getElementById("goalsAgainstChart");
  //   let chart = new Chart(ctx, {
  //     type: "polarArea",
  //     data: {
  //       datasets: [{
  //         data: goalsAgainstData,
  //         backgroundColor: colors,
  //         borderColor: colors
  //       }],
  //       labels: labels,
  //     },
  //     arc: {
  //       backgroundColor: "white",
  //       borderColor: "white"
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       title: {
  //         display: true,
  //         text: `Goals Against/Game Compared To League`,
  //         fontColor: "white"
  //       },
  //       legend: {
  //         display: false
  //       },
  //       scale: {
  //         ticks: {
  //           fontColor: "white",
  //           showLabelBackdrop: false
  //         },
  //         pointLabels: {
  //           fontColor: "white"
  //         },
  //         gridLines: {
  //           color: 'rgba(255, 255, 255, 0.2)'
  //         }
  //       }
  //     }
  //   })
  // }

}
