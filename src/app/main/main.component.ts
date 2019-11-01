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

  goalDiffData = [];

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
      console.log(this.stats);
      this.pointsChart(this.team.shortName);
      this.goalDiffChart(this.team.shortName);
      this.isLoading = false;
    });
  }

  toSalaryPage(link) {
    window.open(link);
  }

  logout() {
    console.log(this.currentUser);
    this._authService.logout();
    this._router.navigate(['/login']);
    console.log(this.currentUser);
  }

  checkRank(type, teamName, stat) {
    switch (type) {
      case "points":
        this.stats.sort((a,b) => b.points - a.points);
        let index = this.stats.findIndex(team => team.team_name === teamName);
        console.log(index);
        return (index+1).toString();
      case "goal_diff":
        console.log(this.goalDiffData);
        this.goalDiffData.sort((a,b) => b.goal_diff - a.goal_diff);
        let goalDiffIndex = this.goalDiffData.findIndex(team => team.team === teamName);
        console.log(goalDiffIndex);
        return (goalDiffIndex+1).toString();
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
    console.log(this.goalDiffData);
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

  ngOnDestroy() {
    this._alive = false;
  }

}
