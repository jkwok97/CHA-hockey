import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  stats = [];
  player: any;
  playerStats: any;
  goalieStats: any;
  goalLeader: any;
  assistLeader: any;
  goalPpLeader: any;
  pointsLeader: any;
  shGoalsLeader: any;
  plusMinusLeader: any;

  pointsRank: string;
  goalDiffRank: string;
  shotDiffRank: string;
  winPctRank: string;
  ppRank: string;
  pkRank: string;
  goalsForRank: string;
  goalsAgainstRank: string;
  currentSeason: string;
  currentSeasonType: string;
  goalsForPerGame: string;
  goalsAgainstPerGame: string;
  winPct: string;
  pimPerGame: string;
  goalDiff: string;
  ppPct: string;
  pkPct: string;
  totalShotDiff: string;
  seasonType: string = 'Regular';

  totalGP: number = 0;
  totalWins: number = 0;
  totalLoss: number = 0;
  totalTies: number = 0;
  totalPoints: number = 0;
  totalGF: number = 0;
  totalGA: number = 0;
  totalPP: number = 0;
  totalPPA: number = 0;
  totalPK: number = 0;
  totalPKA: number = 0;
  totalSHG: number = 0;
  totalPIM: number = 0;
  totalShotsFor: number = 0;
  totalShotsAgainst: number = 0;
  
  goalDiffData = [];
  shotDiffData = [];
  winPctData = [];
  ppPctData = [];
  pkPctData = [];
  goalsForData = [];
  goalsAgainstData = [];
  playerGoalsData = [];
  playerPpGoalsData = [];
  playerAssistsData = [];
  playerPointsData = [];
  playerShGoalsData = [];
  playerPlusMinusData = [];

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild("overallSort", {static: false}) overallSort: MatSort;
  @ViewChild("playerSort", {static: false}) playerSort: MatSort;
  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }
    // console.log(this.currentUser);
    this.team = this._teamsService.getTeamInfo(this.currentUser[0].short_name);
    // console.log(this.team);
    this._router.navigate([`/main/`], {
      relativeTo: this._route,
      queryParams: { team: this.team.shortName },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    })
   }

  ngOnInit() {
    this.currentSeason = this._teamsService.currentSeason;
    this.currentSeasonType = this._teamsService.currentSeasonType;
    this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let allTeams = resp as [];
      allTeams.forEach(team => {
        if (team['playing_year'] === this.currentSeason && team['season_type'] === this.currentSeasonType) { this.stats.push(team); }
      });
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
    this._teamsService.getTeamPlayerStatsByYearByType(this.team.shortName, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.playerStats = resp as [];
      // console.log(this.playerStats);
      this.players = new MatTableDataSource<any[]>(this.playerStats);
      this.players.sort = this.playerSort;
    });
    this._teamsService.getTeamGoalieStatsByYearByType(this.team.shortName, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.goalieStats = resp as [];
      // console.log(this.goalieStats);
      this.goalies = new MatTableDataSource<any[]>(this.goalieStats);
      this.goalies.sort = this.goalieSort;
    });
  }

  openTeam(shortName, season, type) {
    this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
    window.scrollTo(0,0);
  }

  toSalaryPage(link) {
    window.open(link);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  checkString(team) {
    if (team.shortName === "STA") {
      this.resetStats();
      this.getKillerBeesStats(team, this.seasonType);
    } else if (team.shortName === "ATL") {
      this.resetStats();
      this.getFlashersStats(team, this.seasonType);
    } else if (team.shortName === "CHY") {
      this.resetStats();
      this.getDesperadosStats(team, this.seasonType);
    } else if (team.shortName === "SCS") {
      this.resetStats();
      this.getStringraysStats(team, this.seasonType);
    } else if (team.shortName === "OAK") {
      this.resetStats();
      this.getAssassinsStats(team, this.seasonType);
    } else {
      this._teamsService.getAlltimeTeamStatsByType(team.shortName, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        let teamStats = resp as [];
        this.isLoading = false;
        this.resetStats();
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });
    }
  }

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.checkString(this.team);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.resetStats();
      this.checkString(this.team);
    }
  }

  onTabChange(event) {
    // console.log(event);
    if (event.tab.textLabel === "Player Charts") {
      this.playerGoalChart();
      this.playerAssistChart();
      this.playerPpGoalChart();
      this.playerPointsChart();
      this.playerShgGoalChart();
      this.playerPlusMinusChart();
    } else if (event.tab.textLabel === "Team History") {
      this.checkString(this.team);
    } else if (event.tab.textLabel === "Division") {
      
    }
  }

  getTeamTotals(stats) {
    stats.forEach(year => {
      this.totalGP += Number(year.games_played);
      this.totalWins += Number(year.wins);
      this.totalLoss += Number(year.loss);
      this.totalTies += Number(year.ties);
      this.totalPoints += Number(year.points);
      this.totalGF += Number(year.goals_for);
      this.totalGA += Number(year.goals_against);
      this.totalPP += Number(year.pp_goals);
      this.totalPPA += Number(year.pp_attempts);
      this.totalPK += Number(year.pk_goals);
      this.totalPKA += Number(year.pk_attempts);
      this.totalSHG += Number(year.sh_goals);
      this.totalPIM += Number(year.penalty_minutes);
      this.totalShotsFor += Number(year.shots_for);
      this.totalShotsAgainst += Number(year.shots_against);
    });
    this.goalsForPerGame = (this.totalGF / this.totalGP).toFixed(2);
    this.goalsAgainstPerGame = (this.totalGA / this.totalGP).toFixed(2);
    this.goalDiff = (this.totalGF - this.totalGA).toString();
    this.winPct = ((this.totalWins / this.totalGP) * 100).toFixed(1);
    this.ppPct = ((this.totalPP / this.totalPPA) * 100).toFixed(1);
    this.pkPct = (((this.totalPKA - this.totalPK) / this.totalPKA) * 100).toFixed(1);
    this.pimPerGame = (this.totalPIM / this.totalGP).toFixed(1);
    this.totalShotDiff = (this.totalShotsFor - this.totalShotsAgainst).toString();
  }

  resetStats() {
    this.totalGP = 0;
    this.totalWins = 0;
    this.totalLoss = 0;
    this.totalTies = 0;
    this.totalGF = 0;
    this.totalGA = 0;
    this.totalPP = 0;
    this.totalPPA = 0;
    this.totalPK = 0;
    this.totalPKA = 0;
    this.totalSHG = 0;
    this.totalPIM = 0;
    this.totalShotsFor = 0;
    this.totalShotsAgainst = 0;
  }

  getKillerBeesStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("MIS", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });          
    });
  }

  getFlashersStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("CHA", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });          
    });
  }

  getDesperadosStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("LVD", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        this._teamsService.getAlltimeTeamStatsByType("SDC", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          let oldTeamStats = resp as [];
          oldTeamStats.forEach(element => {
            teamStats.push(element);
          })
          // console.log(teamStats);
          this.isLoading = false;
          teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
          this.getTeamTotals(teamStats);
          this.teams = new MatTableDataSource<any[]>(teamStats);
          this.teams.sort = this.overallSort;
        });
      });          
    });
  }

  getStringraysStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("SAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });          
    });
  }

  getAssassinsStats(team, type) {
    this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let teamStats = resp as [];
      this._teamsService.getAlltimeTeamStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        let oldTeamStats = resp as [];
        oldTeamStats.forEach(element => {
          teamStats.push(element);
        })
        // console.log(teamStats);
        this.isLoading = false;
        teamStats.sort((a,b) => b['playing_year'] - a['playing_year']);
        this.getTeamTotals(teamStats);
        this.teams = new MatTableDataSource<any[]>(teamStats);
        this.teams.sort = this.overallSort;
      });          
    });
  }

  openPlayer(name, team, position, hits) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    this._teamsService.setPlayerHits(hits);
    window.scrollTo(0,0);
  }

  openGoaliePlayer(name, team, position) {
    this._router.navigate([`/stats/players/${name}`]);
    this._teamsService.setPlayerPosition(position);
    window.scrollTo(0,0);
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

  ngOnDestroy() {
    this._alive = false;
  }

}
