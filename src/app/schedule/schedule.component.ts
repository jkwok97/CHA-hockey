import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;
  showAll: boolean = false;

  schedulePage: any;
  currentSeason: string;
  range: string = 'a402:f821';
  currentDay: number = 131;
  scheduleType: string = "day";

  days = [];
  matchups: any[] = [];
  teamRecord: any[] = [];
  gamesWithRecord: any[];
  teams = [];
  versus: any;

  allSchedule: MatTableDataSource<any[]>;
  mobileAllScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'versus', 'home_team', 'result' ];
  allScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'vis_team_name', 'vis_team_score', 'versus', 'home_team_score', 'home_team', 'home_team_name' ];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService
  ) { 
    this.currentSeason = this._teamsService.currentSeason;
    this.teams = this._teamsService.currentLeague.teams;
  }

  ngOnInit() {
    this.isLoading = true;
    this.checkMobile();
    this.getMatchupTotals();
    this.getNextDaysSchedule(this.currentDay);
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  applyFilter(filterValue: string) {
    this.allSchedule.filter = filterValue.trim().toLowerCase();
    if (this.allSchedule.paginator) {
      this.allSchedule.paginator.firstPage();
    }
  }

  changeSchedule(value) {
    // console.log(value);
    if (value === "all") {
      this.showAll = true;
      this.isLoading = true;
      this.getAllSchedule();
    } else if (value === "day") {
      this.showAll = false;
      this.isLoading = true;
      this.getNextDaysSchedule(this.currentDay);
    } else if (value === "prev") {
      this.showAll = false;
      this.isLoading = true;
      this.getNextDaysSchedule(this.currentDay - 5);
    } else if (value === "next") {
      this.showAll = false;
      this.isLoading = true;
      this.getNextDaysSchedule(this.currentDay + 5);
    } 
  }

  getLastFiveRecord(games) {
    // console.log(games);
    this.teams.forEach(team => {
      this.teamRecord.push({
        team: team.shortName,
        record: []
      })
    });
    games.forEach(game => {
      let homeTeam = this.teamRecord.find(element => element.team === game.home_team_name);
      let roadTeam = this.teamRecord.find(element => element.team === game.vis_team_name);
      if (game.home_team_score > game.vis_team_score) {
        homeTeam.record.push({day: game.game_day, result: "home win"});
        roadTeam.record.push({day: game.game_day, result: "road loss"});
      } else if (game.home_team_score < game.vis_team_score) {
        homeTeam.record.push({day: game.game_day, result: "home loss"});
        roadTeam.record.push({day: game.game_day, result: "road win"});
      } else if (game.home_team_score && (game.home_team_score == game.vis_team_score)) {
        homeTeam.record.push({day: game.game_day, result: "home tie"})
        roadTeam.record.push({day: game.game_day, result: "road tie"})
      }
      game.home_team_record = homeTeam.record.slice(homeTeam.record.length - 5, homeTeam.record.length);
      game.vis_team_record = roadTeam.record.slice(roadTeam.record.length - 5, roadTeam.record.length);
      game.home_team_record.sort((a,b) => a['day'] - b['day']);
      game.vis_team_record.sort((a,b) => a['day'] - b['day']);
    })
    return games;
  }

  getMatchupTotals() {
    // console.log(this.teams);
    this.separateTeams();
    this._teamsService.getAllSchedule().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let games = resp as any[];
      this.populateMatchups(games);
      this.getMatchupRecord();
      this.gamesWithRecord = this.getLastFiveRecord(games);
    });
  }

  getMatchupRecord() {
    // console.log(this.matchups);
    this.matchups.forEach(matchup => {
      matchup.versus.forEach(team => {
        let matchupWins = 0;
        let matchupLoss = 0;
        let matchupTie = 0;
        team.games.forEach(game => {
          if (game.home_team_name === matchup.team) {
            if (game.home_team_score > game.vis_team_score) {
              matchupWins++;
            } else if (game.home_team_score < game.vis_team_score) {
              matchupLoss++;
            } else if ((game.home_team_score == game.vis_team_score) && (game.home_team_score !== null)) {
              matchupTie++;
            }
          } else {
            if (game.vis_team_score > game.home_team_score) {
              matchupWins++;
            } else if (game.vis_team_score < game.home_team_score) {
              matchupLoss++;
            } else if ((game.home_team_score == game.vis_team_score) && (game.home_team_score !== null)) {
              matchupTie++;
            }
          }
        });
        team.matchupWins = matchupWins;
        team.matchupLoss = matchupLoss;
        team.matchupTie = matchupTie;
      })
    })
  }

  populateMatchups(games) {
    // console.log(this.matchups);
    this.matchups.forEach(team => {
      games.forEach(game => {
        if (game.home_team_name === team.team) {
          let versus = game.vis_team_name;
          let index = team.versus.findIndex(name => name.team === versus);
          if (index !== null) {
            team.versus[index].games.push(game);
          }
          if (game.home_team_score > game.vis_team_score) {
            team.lastFiveRecord.push({day: game.game_day, result: "win"});
          } else if (game.home_team_score < game.vis_team_score) {
            team.lastFiveRecord.push({day: game.game_day, result: "loss"});
          } else if (game.home_team_score && (game.home_team_score == game.vis_team_score)) {
            team.lastFiveRecord.push({day: game.game_day, result: "tie"});
          }
        } 
        if (game.vis_team_name === team.team) {
          let versus = game.home_team_name;
          let index = team.versus.findIndex(name => name.team === versus);
          if (index !== null) {
            team.versus[index].games.push(game);
          }
          if (game.home_team_score > game.vis_team_score) {
            team.lastFiveRecord.push({day: game.game_day, result: "loss"});
          } else if (game.home_team_score < game.vis_team_score) {
            team.lastFiveRecord.push({day: game.game_day, result: "win"});
          } else if (game.home_team_score && (game.home_team_score == game.vis_team_score)) {
            team.lastFiveRecord.push({day: game.game_day, result: "tie"});
          }
        }
      })
    })
  }

  separateTeams() {
    this.teams.forEach(team => {
      this.matchups.push({
        team: team.shortName,
        lastFiveRecord: [],
        versus: this.getVersus(team.shortName)
      })
      // console.log(this.matchups);
    });
  }

  getVersus(name) {
    let versusArray = [];
    this.teams.forEach(team => {
      if (team.shortName !== name) {
        versusArray.push({team: team.shortName, games: []});
      }
    });
    return versusArray;
  }

  getNextDaysSchedule(currentDay) {
    this.isLoading = true;
    this.days = [];
    this.days.push(
      {day: currentDay, games: []},
      {day: currentDay+1, games: []},
      {day: currentDay+2, games: []},
      {day: currentDay+3, games: []},
      {day: currentDay+4, games: []}
      );
    this.days.forEach(day => {
      this._teamsService.getDaySchedule(day.day).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        day.games.push(resp);
      });
      setTimeout(() => {
        day.games[0].forEach(element => {
        this._teamsService.getTeamStatsByYear(element.vis_team_name, this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          // console.log(resp);
          element.vis_team_stats = resp[0];
          let found = this.matchups.find(matchup => matchup.team === element.vis_team_name).lastFiveRecord;
          let lastFive = found.slice(found.length - 5, found.length);
          element.vis_team_last_five = lastFive.sort((a,b) => b['day'] - a['day']);
        });
        this._teamsService.getTeamStatsByYear(element.home_team_name, this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
          // console.log(resp);
          element.home_team_stats = resp[0];
          let found = this.matchups.find(matchup => matchup.team === element.home_team_name).lastFiveRecord;
          let lastFive = found.slice(found.length - 5, found.length);
          element.home_team_last_five = lastFive.sort((a,b) => b['day'] - a['day']);
        });
      });
      }, 1000);
    })
    this.populateMatchUpRecord(this.days);
    setTimeout(() => {
      this.isLoading = false;
    },2000);
  }

  populateMatchUpRecord(days) {
    days.forEach(day => {
      setTimeout(() => {
        day.games[0].forEach(game => {
          let found = this.matchups.find(matchup => matchup.team === game.home_team_name );
          let versusFound = found.versus.find(team => team.team === game.vis_team_name);
          game.vis_team_wins = versusFound.matchupLoss;
          game.vis_team_loss = versusFound.matchupWins;
          game.vis_team_ties = versusFound.matchupTie;
        })
      }, 1000);
    })
  }

  getAllSchedule() {
    this._teamsService.getAllSchedule().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.days = resp as [];
      this.allSchedule = new MatTableDataSource<any[]>(this.days);
      this.length = this.days.length;
      this.isLoading = false;
      setTimeout(() => {
        this.allSchedule.paginator = this.paginator;
        this.allSchedule.sort = this.sort;
      }, 350);
    });
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
