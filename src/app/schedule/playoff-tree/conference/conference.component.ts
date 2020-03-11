import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() title: string;
  @Input() quarterMatchups: [];
  @Input() semiMatchups: Observable<[]>;
  @Input() conferenceMatchups: [];

  constructor() { }

  ngOnInit() {
    console.log(this.semiMatchups);
    console.log(this.conferenceMatchups);
  }

  ngAfterViewInit() {
    console.log(this.semiMatchups);
    console.log(this.conferenceMatchups);
  }

  ngAfterContentInit() {
    console.log(this.semiMatchups);
    console.log(this.conferenceMatchups);
  }

}
