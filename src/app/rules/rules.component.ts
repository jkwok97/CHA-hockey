import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Player Equalization', url: 'equalization', current: true},
    {name: 'Draft Lottery', url: 'lottery', current: false},
    {name: 'Emergency Goaltender Rule', url: 'egr', current: false},
    {name: 'Player Protection Rule', url: 'protection', current: false},
    {name: 'Roster Max & Min', url: 'rosters', current: false},
    {name: 'Waiver Wire', url: 'waivers', current: false},
    {name: 'Winnings', url: 'winnings', current: false},
  ];

  constructor( ) { 
    
  }

  ngOnInit() {
    
  }

}
