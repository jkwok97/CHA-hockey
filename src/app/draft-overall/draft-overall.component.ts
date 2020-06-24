import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-overall',
  templateUrl: './draft-overall.component.html',
  styleUrls: ['./draft-overall.component.css']
})
export class DraftOverallComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Draft Table', url: 'picks', current: true},
    {name: 'Summary', url: 'summary', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
