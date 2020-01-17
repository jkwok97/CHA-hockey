import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentTeam: any;
  allPlayerInfo: any;
  teamPlayerStats: any;

  currentSeason: string = "2019-20";
  currentSeasonType: string = "Regular";
  allSalaryPagesArray = [];

  isMobile: boolean;

  private _subjectPlayerStats = new Subject<any>();

  league = {
    conference: [{
      name: "western conference",
      division: [{
        name: "north west division",
        teams: [
          { name: "Seattle Storm", shortName: "SEA", image: "../../assets/team_logos/Storm.png", owner: "Matt Hamilton" },
          { name: "Oakland Assassins", shortName: "OAK", image: "../../assets/team_logos/Assassins.png", owner: "Joseph Sutherland" },
          { name: "Kelowna Mountaineers", shortName: "KEL", image: "../../assets/team_logos/Mountaineers.png", owner: "Randy Foster", },
          { name: "Victoria Vipers", shortName: "VIC", image: "../../assets/team_logos/Vipers.png", owner: "Ryan Bender", },
          { name: "San Francisco Fighting Cocks", shortName: "SFC", image: "../../assets/team_logos/Cocks.png", owner: "Darren Koyata", },
        ]
      },{
        name: "south west division",
        teams: [
          { name: "Memphis Hound Dogs", shortName: "MEM", image: "../../assets/team_logos/HoundDogs.png", owner: "Rick Lundy", },
          { name: "Oklahoma City Oil Barons", shortName: "OKL", image: "../../assets/team_logos/OilBarons.png", owner: "Colin Baillon", },
          { name: "Cheyenne Desperado", shortName: "CHY", image: "../../assets/team_logos/Desperado.png", owner: "Ferrel Hedberg", },
          { name: "Wichita Wolfpack", shortName: "WIT", image: "../../assets/team_logos/Wolfpack.png", owner: "Lucas Bristow", },
          { name: "Lone Star Brahmas", shortName: "LSB", image: "../../assets/team_logos/Brahmas.png", owner: "Graham Witherspoon", },
        ]
      }]
    },{
      name: "eastern conference",
      division: [{
        name: "north east division",
        teams: [
          { name: "Milwaukee Ice Dragons", shortName: "MIL", image: "../../assets/team_logos/Dragons.png", owner: "Lee Snowden", },
          { name: "Indianapolis Goats", shortName: "IND", image: "../../assets/team_logos/Goats.png", owner: "Scott Snowden", },
          { name: "Peoria Prowlers", shortName: "PEO", image: "../../assets/team_logos/Prowlers.png", owner: "Barry Bristow", },
          { name: "Mississauga North Stars", shortName: "MSG", image: "../../assets/team_logos/NorthStars.png", owner: "Joe Scardigno", },
          { name: "Green Bay Glory", shortName: "GRE", image: "../../assets/team_logos/Glory.png", owner: "Brian Dillon", },
        ]
      },{
        name: "south east division",
        teams: [
          { name: "Augusta Green Jackets", shortName: "AUG", image: "../../assets/team_logos/GreenJackets.png", owner: "Darcy Donaldson", },
          { name: "Staten Island Killer Bees", shortName: "STA", image: "../../assets/team_logos/KillerBees.png", owner: "Jeff Kwok", },
          { name: "Cincinnati Cyclones", shortName: "CIN", image: "../../assets/team_logos/Cyclones.png", owner: "John Chin", },
          { name: "South Carolina Stingrays", shortName: "SCS", image: "../../assets/team_logos/Rays.png", owner: "Kelly Gardner", },
          { name: "Atlanta Flashers", shortName: "ATL", image: "../../assets/team_logos/Flashers.png", owner: "Patrick Ryan", },
        ]
      }]
    }]
  }

  allSalaryPages = [{ name: 'All Forwards', },{ name: 'All Defense', },{ name: 'All Goaltenders', }]

  currentLeague = {
    teams: [
      { name: "Seattle Storm", shortName: "SEA", image: "../../assets/team_logos/Storm.png", owner: "Matt Hamilton", 
        color: '#000122', fontColor: 'white' 
      },
      { name: "Oakland Assassins", shortName: "OAK", image: "../../assets/team_logos/Assassins.png", owner: "Joseph Sutherland", 
        color: '#e10000', fontColor: 'white'  
      },
      { name: "Kelowna Mountaineers", shortName: "KEL", image: "../../assets/team_logos/Mountaineers.png", owner: "Randy Foster", 
        color: '#ec131e', fontColor: 'white'   
      },
      { name: "Victoria Vipers", shortName: "VIC", image: "../../assets/team_logos/Vipers.png", owner: "Ryan Bender", 
        color: '#5ebe7d', fontColor: 'black' 
      },
      { name: "San Francisco Fighting Cocks", shortName: "SFC", image: "../../assets/team_logos/Cocks.png", owner: "Darren Koyata", 
        color: '#2a4543', fontColor: 'white'  
      },
      { name: "Memphis Hound Dogs", shortName: "MEM", image: "../../assets/team_logos/HoundDogs.png", owner: "Rick Lundy", 
        color: '#488cc4', fontColor: 'white'  
      },
      { name: "Oklahoma City Oil Barons", shortName: "OKL", image: "../../assets/team_logos/OilBarons.png", owner: "Colin Baillon", 
        color: '#f6c522', fontColor: 'black'  
      },
      { name: "Cheyenne Desperado", shortName: "CHY", image: "../../assets/team_logos/Desperado.png", owner: "Ferrel Hedberg", 
        color: '#b40b07', fontColor: 'white'  
      },
      { name: "Wichita Wolfpack", shortName: "WIT", image: "../../assets/team_logos/Wolfpack.png", owner: "Lucas Bristow", 
        color: '#051443', fontColor: 'white'  
      },
      { name: "Lone Star Brahmas", shortName: "LSB", image: "../../assets/team_logos/Brahmas.png", owner: "Graham Witherspoon", 
        color: '#d09a2c', fontColor: 'white'  
      },
      { name: "Milwaukee Ice Dragons", shortName: "MIL", image: "../../assets/team_logos/Dragons.png", owner: "Lee Snowden", 
        color: '#830083', fontColor: 'white'  
      },
      { name: "Indianapolis Goats", shortName: "IND", image: "../../assets/team_logos/Goats.png", owner: "Scott Snowden", 
        color: '#e0771f', fontColor: 'white'  
      },
      { name: "Peoria Prowlers", shortName: "PEO", image: "../../assets/team_logos/Prowlers.png", owner: "Barry Bristow", 
        color: '#a87f4a', fontColor: 'white'  
      },
      { name: "Mississauga North Stars", shortName: "MSG", image: "../../assets/team_logos/NorthStars.png", owner: "Joe Scardigno", 
        color: '#035f32', fontColor: 'white'  
      },
      { name: "Green Bay Glory", shortName: "GRE", image: "../../assets/team_logos/Glory.png", owner: "Brian Dillon", 
        color: '#31b18a', fontColor: 'white'  
      },
      { name: "Augusta Green Jackets", shortName: "AUG", image: "../../assets/team_logos/GreenJackets.png", owner: "Darcy Donaldson", 
        color: '#005746', fontColor: 'white'  
      },
      { name: "Staten Island Killer Bees", shortName: "STA", image: "../../assets/team_logos/KillerBees.png", owner: "Jeff Kwok", 
        color: '#d28507', fontColor: 'white'  
      },
      { name: "Cincinnati Cyclones", shortName: "CIN", image: "../../assets/team_logos/Cyclones.png", owner: "John Chin", 
        color: '#eb0d2d', fontColor: 'white'  
      },
      { name: "South Carolina Stingrays", shortName: "SCS", image: "../../assets/team_logos/Rays.png", owner: "Kelly Gardner", 
        color: '#00395f', fontColor: 'white'  
      },
      { name: "Atlanta Flashers", shortName: "ATL", image: "../../assets/team_logos/Flashers.png", owner: "Patrick Ryan", 
        color: '#cd0000', fontColor: 'white' 
      },
    ]
  }

  archivedLeague = {
    teams: [
      { name: "Mississippi Mudbugs", shortName: "MIS", image: "../../assets/team_logos/mudbugs.png", owner: "Jeff Kwok", color: '#000122', fontColor: 'white' },
      { name: "Charlotte Storm", shortName: "CHA", image: "../../assets/team_logos/chastorm.png", owner: "Patrick Ryan", color: '#000122', fontColor: 'white' },
      { name: "Seattle Surge", shortName: "STS", image: "../../assets/team_logos/surge.png", owner: "Corey Abbott", color: '#000122', fontColor: 'white' },
      { name: "Las Vegas Desperado", shortName: "LVD", image: "../../assets/team_logos/lasdesperado.png", owner: "Ferrel Hedberg", color: '#000122', fontColor: 'white' },
      { name: "San Antonio Outlaws", shortName: "SAO", image: "../../assets/team_logos/outlaws.png", owner: "Kelly Gardner", color: '#000122', fontColor: 'white' },
      { name: "Oakland Oceanus", shortName: "OAO", image: "../../assets/team_logos/oceanus.png", owner: "Joseph Sutherland", color: '#000122', fontColor: 'white' },
      { name: "Atlantic City Aces", shortName: "ATC", image: "../../assets/team_logos/aces.png", owner: "Michael Stafford", color: '#000122', fontColor: 'white' },
      { name: "Toledo Honey Badgers", shortName: "TOL", image: "../../assets/team_logos/badgers.png", owner: "Jordan Schartner", color: '#000122', fontColor: 'white' },
      { name: "Brandon Bandits", shortName: "BRA", image: "../../assets/team_logos/bandits.png", owner: "Jason Stanier", color: '#000122', fontColor: 'white' },
      { name: "Cleveland Barons", shortName: "CLE", image: "../../assets/team_logos/barons.png", owner: "Kevin Schmitz", color: '#000122', fontColor: 'white' },
      { name: "Albuquerque Chupacabras", shortName: "ALB", image: "../../assets/team_logos/chupacabras.png", owner: "Chad Fisher", color: '#000122', fontColor: 'white' },
      { name: "Halifax Conquerers", shortName: "HAL", image: "../../assets/team_logos/conquerers.png", owner: "Greg Abbott", color: '#000122', fontColor: 'white' },
      { name: "San Diego Crush", shortName: "SDC", image: "../../assets/team_logos/crush.png", owner: "Ferrel Hedberg", color: '#000122', fontColor: 'white' },
      { name: "Winnepeg Hellcats", shortName: "WIN", image: "../../assets/team_logos/hellcats.png", owner: "Ciaran Murtagh", color: '#000122', fontColor: 'white' },
      { name: "Mississauga Indians", shortName: "MGA", image: "../../assets/team_logos/indians.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
      { name: "Salem Indians", shortName: "SAL", image: "../../assets/team_logos/indians.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
      { name: "Jacksonville Jokers", shortName: "JAC", image: "../../assets/team_logos/jokers.png", owner: "Scott Cochrane", color: '#000122', fontColor: 'white' },
      { name: "Louisville Lionhearts", shortName: "LVL", image: "../../assets/team_logos/lionhearts.png", owner: "Nick McCurry", color: '#000122', fontColor: 'white' },
      { name: "Abbotsford Loggerheads", shortName: "ABB", image: "../../assets/team_logos/loggerheads.png", owner: "Kyle Einar", color: '#000122', fontColor: 'white' },
      { name: "Hamilton Predators", shortName: "HAM", image: "../../assets/team_logos/predators.png", owner: "Matt Beatty", color: '#000122', fontColor: 'white' },
      { name: "Hamilton Rednecks", shortName: "HAR", image: "../../assets/team_logos/rednecks.png", owner: "Travis Quinn", color: '#000122', fontColor: 'white' },
      { name: "Cape Breton Royals", shortName: "CBR", image: "../../assets/team_logos/royals.png", owner: "Ben Bruchet", color: '#000122', fontColor: 'white' },
      { name: "Red Deer Rustlers", shortName: "RDR", image: "../../assets/team_logos/rustlers.png", owner: "Dan Wood", color: '#000122', fontColor: 'white' },
      { name: "Halifax Schooners", shortName: "HAS", image: "../../assets/team_logos/schooners.png", owner: "Adam Martin", color: '#000122', fontColor: 'white' },
      { name: "Quebec City Thundercats", shortName: "QUE", image: "../../assets/team_logos/thundercats.png", owner: "Jordan Schartner", color: '#000122', fontColor: 'white' },
      { name: "Louisiana Voodoo", shortName: "LOU", image: "../../assets/team_logos/voodoo.png", owner: "Ryan Pollock", color: '#000122', fontColor: 'white' },
      { name: "Washington Whiskeyjacks", shortName: "WAS", image: "../../assets/team_logos/whiskeyjacks.png", owner: "Randy Lazzarotto", color: '#000122', fontColor: 'white' },
      { name: "Tallahasse Crimsontide", shortName: "TAL", image: "../../assets/team_logos/crimsontide.png", owner: "Darren Ward", color: '#000122', fontColor: 'white' },
      { name: "Portland Beavers", shortName: "POR", image: "../../assets/team_logos/beavers.png", owner: "Jeff Muggleston", color: '#000122', fontColor: 'white' },
      { name: "Houston Comets", shortName: "HOU", image: "../../assets/team_logos/comets.png", owner: "Al Godfrey", color: '#000122', fontColor: 'white' },
      { name: "Salem Grave Diggers", shortName: "SGD", image: "../../assets/team_logos/gravediggers.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
    ]
  }

  constructor(
    private _http: HttpClient
  ) { 
    this.allSalaryPagesArray = this.currentLeague.teams.concat(this.allSalaryPages as []);
    // console.log(this.allSalaryPagesArray);
  }

  setMobile(bool) {
    this.isMobile = bool;
  }

  getTeamPlayerStats(team) {
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`);
  }

  getPlayerStats() {
    return this._http.get(`${environment.back_end_url}/players-stats/`);
  }

  getTeamGoalieStats(team) {
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`);
  }

  getGoalieStats() {
    return this._http.get(`${environment.back_end_url}/goalies-stats/`);
  }

  getTeamStats(team) {
    return this._http.get(`${environment.back_end_url}/team-stats/${team}`);
  }

  getTeamStatsByYear(team, year) {
    let options = {params: new HttpParams()
      .set('year', year)}
    return this._http.get(`${environment.back_end_url}/team-stats/${team}`, options);
  }

  getLeagueTeamsStats(year) {
    let options = {params: new HttpParams()
      .set('year', year)}
    return this._http.get(`${environment.back_end_url}/team-stats/`, options);
  }

  getAlltimeLeagueTeamsStats() {
    return this._http.get(`${environment.back_end_url}/team-stats/`);
  }

  getAlltimeTeamStatsByType(team, type) {
    // console.log(team, type)
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/team-stats/${team}`, options);
  }

  getTeamInfo(short) {
    let found;
    found = this.currentLeague.teams.find(team => team.shortName === short);
    if (found !== undefined) { 
      this.currentTeam = found; 
    } else {
      found = this.archivedLeague.teams.find(element => element.shortName === short);
      if (found) { this.currentTeam = found; } 
    }
    return this.currentTeam;
  }

  getTeamInfo1(short) {
    let found;
    this.league.conference.forEach( conference => {
      conference.division.forEach(division => {
        found = division.teams.find(team => team.shortName === short);
        if (found !== undefined) { this.currentTeam = found; }
        else { 
          found = this.archivedLeague.teams.find(element => element.shortName === short);
          if (found) { this.currentTeam = found; } 
        }
      })
    })
    return this.currentTeam;
  }

  getChampions(type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/champions/`, options);
  }

  getDrafts() {
    return this._http.get(`${environment.back_end_url}/drafts/`);
  }

  // this.getPlayerInfo().subscribe(resp => {
  //   this.allPlayerInfo = resp;
  // });

  getPlayerInfo() {
    return this._http.get(`${environment.back_end_url}/player-info/`);
  }

  sendPlayerStatsTrigger(stats) {
    // console.log(stats);
    this.teamPlayerStats = stats;
    this._subjectPlayerStats.next(stats);
  }

  sendPlayerStatsListener(): Observable<any> {
    return this._subjectPlayerStats.asObservable();
  }

  getPlayerStatsByType(type, group) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getGoalieStatsByType(type, group) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/`, options);
  }

  getAlltimeLeagueTeamsStatsByType(type, group) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/team-stats/`, options);
  }

  getPlayerStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getGoalieStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/`, options)
  }

  getTeamPlayerStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`, options);
  }

  getTeamGoalieStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`, options);
  }

  getAlltimeTeamPlayerStatsByType(team, type, group) {
    // console.log(team, type)
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`, options);
  }

  getAlltimeTeamGoalieStatsByType(team, type, group) {
    // console.log(team, type)
    let options = {params: new HttpParams()
      .set('type', type)
      .set('group', group)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`, options);
  }

  getAllIndividualPlayerStats(name) {
    return this._http.get(`${environment.back_end_url}/players/${name}`);
  }

  getAllIndividualPlayerStatsByType(name, type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players/${name}`, options);
  }

  getAllIndividualGoalieStats(name) {
    return this._http.get(`${environment.back_end_url}/goalies/${name}`);
  }

  getAllIndividualGoalieStatsByType(name, type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies/${name}`, options);
  }

  getAllIndividualPlayerStatsReal(name, league) {
    let options = {params: new HttpParams()
      .set('league', league)}
    return this._http.get(`${environment.back_end_url}/players/${name}`, options);
  }

  getAllIndividualPlayerStatsByTypeReal(id, type, league) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('league', league)}
    return this._http.get(`${environment.back_end_url}/players/${id}`, options);
  }

  getAllIndividualGoalieStatsReal(name, league) {
    let options = {params: new HttpParams()
      .set('league', league)}
    return this._http.get(`${environment.back_end_url}/goalies/${name}`, options);
  }

  getAllIndividualGoalieStatsByTypeReal(id, type, league) {
    let options = {params: new HttpParams()
      .set('type', type)
      .set('league', league)}
    return this._http.get(`${environment.back_end_url}/goalies/${id}`, options);
  }

  getIndividualNHLRealStats(id) {
    let options = {params: new HttpParams()
      .set('id', id)}
    return this._http.get(`${environment.back_end_url}/real-stats/`, options);
  }

  getIndividualOnPaceNHLRealStats(id, pace) {
    let options = {params: new HttpParams()
      .set('pace', pace)
      .set('id', id)}
    return this._http.get(`${environment.back_end_url}/real-stats/`, options);
  }

  getPlayerRatings(id) {
    return this._http.get(`${environment.back_end_url}/player-ratings/${id}`);
  }

  getGoalieRatings(id) {
    return this._http.get(`${environment.back_end_url}/goalie-ratings/${id}`);
  }

  getDraftTable() {
    return this._http.get(`${environment.back_end_url}/draft-table/`);
  }

  getWaiverTeams() {
    return this._http.get(`${environment.back_end_url}/waivers/`);
  }

  getAllSchedule() {
    return this._http.get(`${environment.back_end_url}/schedule/`);
  }

  getDaySchedule(day) {
    let options = {params: new HttpParams()
      .set('day', day)}
    return this._http.get(`${environment.back_end_url}/schedule/`, options);
  }

}
