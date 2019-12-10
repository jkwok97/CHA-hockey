import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit, AfterViewInit, OnDestroy {

  private _alive:boolean = true;

  constructor( ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
