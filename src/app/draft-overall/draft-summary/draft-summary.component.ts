import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { DraftService } from 'src/app/_services/draft.service';
import { MatTableDataSource } from '@angular/material';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-draft-summary',
  templateUrl: './draft-summary.component.html',
  styleUrls: ['./draft-summary.component.css']
})
export class DraftSummaryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;

  players: MatTableDataSource<any[]>;
  columns = ['draft_year', 'draft_round', 'draft_overall', 'player_name', 'team_logo', 'team'];
  mobileColumns = ['draft_year','draft_overall', 'player_name', 'team_logo'];

  constructor(
    private _draftService: DraftService,
    private _displayService: DisplayService
  ) { }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.isLoading = true;

    this.getDraftPicks();

  }

  getDraftPicks() {
    this._draftService.getDraftSummary().pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.players = new MatTableDataSource<any[]>(resp as []);
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
