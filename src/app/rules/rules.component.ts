import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EqualizationComponent } from './equalization/equalization.component';
import { LotteryComponent } from './lottery/lottery.component';
import { EgrComponent } from './egr/egr.component';
import { ProtectionComponent } from './protection/protection.component';
import { RostersComponent } from './rosters/rosters.component';
import { WaiversComponent } from './waivers/waivers.component';
import { WinningsComponent } from './winnings/winnings.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean;

  route: any;

  activeLinkIndex = -1;

  routes = [
    {name: 'Player Equalization', url: 'equalization', current: false},
    {name: 'Draft Lottery', url: 'lottery', current: false},
    {name: 'Emergency Goaltender Rule', url: 'egr', current: false},
    {name: 'Player Protection Rule', url: 'protection', current: false},
    {name: 'Roster Max & Min', url: 'rosters', current: false},
    {name: 'Waiver Wire', url: 'waivers', current: false},
    {name: 'Winnings', url: 'winnings', current: false},
  ];

  constructor(
    private _router: Router,
    private _bottomSheet: MatBottomSheet
  ) { 
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
    });
  }

  ngOnInit() {
    this.checkMobile();
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

  openBottomSheet(route) {
    switch (route.url) {
      case "equalization":
        this._bottomSheet.open(EqualizationComponent, {panelClass: 'equalization-panel'});
        break;
      case "lottery":
        this._bottomSheet.open(LotteryComponent, {panelClass: 'lottery-panel'});
        break;
      case "egr":
        this._bottomSheet.open(EgrComponent, {panelClass: 'egr-panel'});
        break;
      case "protection":
        this._bottomSheet.open(ProtectionComponent, {panelClass: 'protection-panel'});
        break;
      case "rosters":
        this._bottomSheet.open(RostersComponent, {panelClass: 'rosters-panel'});
        break;
      case "waivers":
        this._bottomSheet.open(WaiversComponent, {panelClass: 'waivers-panel'});
        break;
      case "winnings":
        this._bottomSheet.open(WinningsComponent, {panelClass: 'winnings-panel'});
        break;
    }
    
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
