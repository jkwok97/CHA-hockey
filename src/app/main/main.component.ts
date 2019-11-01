import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  currentUser: User;

  team: any;
  stats: any;

  pointsRank: string;
  goalDiffRank: string;
  shotDiffRank: string;
  winPctRank: string;
  ppRank: string;
  pkRank: string;
  goalsForRank: string;
  goalsAgainstRank: string;

  goalDiffData = [];
  shotDiffData = [];
  winPctData = [];
  ppPctData = [];
  pkPctData = [];
  goalsForData = [];
  goalsAgainstData = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _teamsService: TeamsService
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }
    console.log(this.currentUser);
    this.team = this._teamsService.getTeamInfo(this.currentUser[0].short_name);
    console.log(this.team);
   }

  ngOnInit() {
    this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp as [];
      this.pointsChart(this.team.shortName);
      this.goalDiffChart(this.team.shortName);
      this.shotDiffChart(this.team.shortName);
      this.winPctChart(this.team.shortName);
      this.ppPctChart(this.team.shortName);
      this.pkPctChart(this.team.shortName);
      this.goalsForChart(this.team.shortName);
      this.goalsAgainstChart(this.team.shortName);
      this.isLoading = false;
    });
  }

  toSalaryPage(link) {
    window.open(link);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  checkRank(type, teamName, stat) {
    switch (type) {
      case "points":
        this.stats.sort((a,b) => b.points - a.points);
        let index = this.stats.findIndex(team => team.team_name === teamName);
        return (index+1).toString();
      case "goal_diff":
        this.goalDiffData.sort((a,b) => b.goal_diff - a.goal_diff);
        let goalDiffIndex = this.goalDiffData.findIndex(team => team.team === teamName);
        return (goalDiffIndex+1).toString();
      case "shot_diff":
        this.shotDiffData.sort((a,b) => b.shot_diff - a.shot_diff);
        let shotDiffIndex = this.shotDiffData.findIndex(team => team.team === teamName);
        return (shotDiffIndex+1).toString();
      case "win_pct":
        this.winPctData.sort((a,b) => b.win_pct - a.win_pct);
        let winPctIndex = this.winPctData.findIndex(team => team.team === teamName);
        return (winPctIndex+1).toString();
      case "pp_pct":
        this.ppPctData.sort((a,b) => b.pp_pct - a.pp_pct);
        let ppPctIndex = this.ppPctData.findIndex(team => team.team === teamName);
        return (ppPctIndex+1).toString();
      case "pk_pct":
        this.pkPctData.sort((a,b) => b.pk_pct - a.pk_pct);
        let pkPctIndex = this.pkPctData.findIndex(team => team.team === teamName);
        return (pkPctIndex+1).toString();
      case "goals_for_avg":
        this.goalsForData.sort((a,b) => b.goals_for_avg - a.goals_for_avg);
        let goalsForIndex = this.goalsForData.findIndex(team => team.team === teamName);
        return (goalsForIndex+1).toString();
      case "goals_against_avg":
        this.goalsAgainstData.sort((a,b) => a.goals_against_avg - b.goals_against_avg);
        let goalsAgainstIndex = this.goalsAgainstData.findIndex(team => team.team === teamName);
        return (goalsAgainstIndex+1).toString();
    }
    
  }

  pointsChart(teamName) {
    let labels = [];
    let pointsData = [];
    let colors = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      pointsData.push(team.points);
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.points = team.points;
        setTimeout(() => {
          this.pointsRank = this.checkRank("points", teamName, this.team.points);
        }, 300);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
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
    let labels = [];
    let colors = [];
    let goalDiffData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      goalDiffData.push(team.goals_for - team.goals_against);
      this.goalDiffData.push({team: team.team_name, goal_diff: (team.goals_for-team.goals_against)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.goal_diff = team.goals_for - team.goals_against;
        setTimeout(() => {
          this.goalDiffRank = this.checkRank("goal_diff", teamName, this.team.goal_diff);
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

  shotDiffChart(teamName) {
    let labels = [];
    let colors = [];
    let shotDiffData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      shotDiffData.push(team.shots_for - team.shots_against);
      this.shotDiffData.push({team: team.team_name, shot_diff: (team.shots_for-team.shots_against)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.shot_diff = team.shots_for - team.shots_against;
        setTimeout(() => {
          this.shotDiffRank = this.checkRank("shot_diff", teamName, this.team.shot_diff);
        }, 300);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
    });
    const ctx = document.getElementById("shotDiffChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: shotDiffData,
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
          text: `Shot Differential Compared To League`,
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

  winPctChart(teamName) {
    let labels = [];
    let colors = [];
    let winPctData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      winPctData.push(((team.wins / team.games_played) * 100).toFixed(1));
      this.winPctData.push({team: team.team_name, win_pct: ((team.wins / team.games_played) * 100).toFixed(1)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.win_pct = ((team.wins / team.games_played) * 100).toFixed(1);
        setTimeout(() => {
          this.winPctRank = this.checkRank("win_pct", teamName, this.team.win_pct);
        }, 300);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
    });
    const ctx = document.getElementById("winPctChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: winPctData,
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
          text: `Win Pct Compared To League`,
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

  ppPctChart(teamName) {
    let labels = [];
    let colors = [];
    let ppPctData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      ppPctData.push(((team.pp_goals / team.pp_attempts) * 100).toFixed(1));
      this.ppPctData.push({team: team.team_name, pp_pct: ((team.pp_goals / team.pp_attempts) * 100).toFixed(1)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.pp_pct = ((team.pp_goals / team.pp_attempts) * 100).toFixed(1);
        setTimeout(() => {
          this.ppRank = this.checkRank("pp_pct", teamName, this.team.pp_pct);
        }, 300);
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

  pkPctChart(teamName) {
    let labels = [];
    let colors = [];
    let pkPctData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      pkPctData.push((((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1));
      this.pkPctData.push({team: team.team_name, pk_pct: (((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.pk_pct = (((team.pk_attempts - team.pk_goals) / team.pk_attempts) * 100).toFixed(1);
        setTimeout(() => {
          this.pkRank = this.checkRank("pk_pct", teamName, this.team.pk_pct);
        }, 300);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
    });
    const ctx = document.getElementById("pkChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: pkPctData,
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
          text: `PK Pct Compared To League`,
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

  goalsForChart(teamName) {
    let labels = [];
    let colors = [];
    let goalsForData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      goalsForData.push((team.goals_for / team.games_played).toFixed(2));
      this.goalsForData.push({team: team.team_name, goals_for_avg: (team.goals_for / team.games_played).toFixed(2)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.goals_for_avg = (team.goals_for / team.games_played).toFixed(2);
        setTimeout(() => {
          this.goalsForRank = this.checkRank("goals_for_avg", teamName, this.team.goals_for_avg);
        }, 300);
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

  goalsAgainstChart(teamName) {
    let labels = [];
    let colors = [];
    let goalsAgainstData = [];
    let opacity = "90"
    this.stats.forEach( (team) => {
      labels.push(team.team_name);
      goalsAgainstData.push((team.goals_against / team.games_played).toFixed(2));
      this.goalsAgainstData.push({team: team.team_name, goals_against_avg: (team.goals_against / team.games_played).toFixed(2)})
      if (team.team_name === teamName) {
        colors.push(("#E53935").concat(opacity))
        this.team.goals_against_avg = (team.goals_against / team.games_played).toFixed(2);
        setTimeout(() => {
          this.goalsAgainstRank = this.checkRank("goals_against_avg", teamName, this.team.goals_against_avg);
        }, 300);
      } else {
        colors.push(("#3D5AFE").concat(opacity))
      }
    });
    const ctx = document.getElementById("goalsAgainstChart");
    let chart = new Chart(ctx, {
      type: "polarArea",
      data: {
        datasets: [{
          data: goalsAgainstData,
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
          text: `Goals Against/Game Compared To League`,
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

  ngOnDestroy() {
    this._alive = false;
  }

}
