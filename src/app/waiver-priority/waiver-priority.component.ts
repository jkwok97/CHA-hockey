import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { WaiversService } from '../_services/waivers.service';
import { DisplayService } from '../_services/display.service';

@Component({
  selector: 'app-waiver-priority',
  templateUrl: './waiver-priority.component.html',
  styleUrls: ['./waiver-priority.component.css']
})
export class WaiverPriorityComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  waiver: MatTableDataSource<any[]>;
  columns = ['pick', 'team_logo', 'team_name'];

  constructor(
    private _waiversService: WaiversService,
    private _displayService: DisplayService
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.isLoading = true;

    this._waiversService.getWaiverTeams().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.waiver = new MatTableDataSource<any[]>(resp as []);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
