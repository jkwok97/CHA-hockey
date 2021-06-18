import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playoff-team-avatar',
  templateUrl: './playoff-team-avatar.component.html',
  styleUrls: ['./playoff-team-avatar.component.css']
})
export class PlayoffTeamAvatarComponent {

  @Input() team;

}
