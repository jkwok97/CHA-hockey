import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DisplayService } from '../_services/display.service';
import { TransactionService } from '../_services/transaction.service';
import { takeWhile } from 'rxjs/operators';
import { Team } from '../_models/team';
import { TeamInfoService } from '../_services/team-info.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  teamPicked: boolean = false;
  isMobile: boolean = false;
  isLoading: boolean = false;
  displayTrades: boolean = true;

  teams: Team[];
  transactions: [];

  years = [
    { 
      label: '20/21 Season', query: '21',
      dateStart: '2020-04-27', 
      dateEnd: '2021-07-15', 
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=1702239337&single=true&widget=false&headers=false&chrome=false'
    },
    { 
      label: '19/20 Season', query: '20', 
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=587747407&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '18/19 Season', query: '19',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=244186077&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '17/18 Season', query: '18',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=882679570&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '16/17 Season', query: '17',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=336901954&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '15/16 Season', qeury: '16',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=534138117&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '14/15 Season', query: '15',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=23&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '13/14 Season', query: '14',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=21&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '12/13 Season', query: '13',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=18&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '11/12 Season', query: '12',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=14&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '10/11 Season', query: '11',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=10&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '09/10 Season', query: '10',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=6&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '08/09 Season', query: '09',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=3&single=true&widget=false&headers=false&chrome=false'
    }
  ];

  tradePage: any;
  year: any;

  @ViewChild('yearSelect', {static: false}) yearSelect;


  constructor(
    private sanitizer: DomSanitizer,
    private _displayService: DisplayService,
    private _transactionService: TransactionService,
    private _teamInfoService: TeamInfoService
  ) {
    this.getTeams();
   }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
    this.isLoading = true;
    setTimeout(() => {
      this.yearSelect.value = '21';
      const start = this.years.find((year) => year.query === this.yearSelect.value).dateStart;
      const end = this.years.find((year) => year.query === this.yearSelect.value).dateEnd;
      this.getTransactions(start, end);
    }, 250)
  }

  getTeams() {
    this._teamInfoService.getTeams().pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
  }

  getTransactions(start, end) {
    this._transactionService.getTransactionByDates(start, end).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {

      setTimeout(() => {

        this.transactions = resp.map((item, index) => ({
          id: item.id,
          transaction_date: this.formatDate(item.transaction_date),
          team_one: this.getTeamInfo(item.team_one_id),
          team_one_picks: item.team_one_picks,
          team_one_players:this.formatPlayers(item.team_one_players, item.team_one_firstnames, item.team_one_lastnames, item.team_one_nhlids),
          team_two: this.getTeamInfo(item.team_two_id),
          team_two_picks: item.team_two_picks,
          team_two_players: this.formatPlayers(item.team_two_players, item.team_two_firstnames, item.team_two_lastname, item.team_two_nhlids)
        }));
  
        this.isLoading = false;

      }, 500)

    })
  }

  formatDate(date) {
    return date.slice(0,10);
  }

  formatPlayers(ids, firstnames, lastnames, nhlids) {
    if (ids) {
      return ids.map((player, index) => ({
        id: ids[index],
        firstname: firstnames[index],
        lastname: lastnames[index],
        nhl_id: nhlids[index]
      }));
    }
  }

  getTeamInfo(id: number) {
    if (this.teams) {
      return this.teams.find((team) => team.id === +id);
    }
  }

  toTradeYear(event) {
    this.yearSelect.value = event.value;
    if (this.yearSelect.value === '21') {
      const start = this.years.find((year) => year.query === this.yearSelect.value).dateStart;
      const end = this.years.find((year) => year.query === this.yearSelect.value).dateEnd;
      this.isLoading = true;
      this.displayTrades = true;
      this.getTransactions(start, end);
    } else {
      this.displayTrades = false;
      this.year = this.years.find(year => year.query === this.yearSelect.value);
      this.tradePage = this.sanitizer.bypassSecurityTrustResourceUrl(this.year.link);
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
