import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RulesComponent } from '../rules.component';

@Component({
  selector: 'app-equalization',
  templateUrl: './equalization.component.html',
  styleUrls: ['./equalization.component.css']
})
export class EqualizationComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RulesComponent>
  ) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
