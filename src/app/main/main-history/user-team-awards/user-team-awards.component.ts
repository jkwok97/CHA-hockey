import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { AwardsService } from 'src/app/_services/awards.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-team-awards',
  templateUrl: './user-team-awards.component.html',
  styleUrls: ['./user-team-awards.component.css']
})
export class UserTeamAwardsComponent implements OnInit {

  currentUser: User;

  awards$: Observable<any>;

  constructor(
    private _awardsService: AwardsService,
    private _authService: AuthService,
    ) { 

      this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
      this.awards$ = this._awardsService.getTeamAwardsByUserId(this.currentUser.id);
    }

  ngOnInit() {
    
  }

  getLogo(logo: string) {
    return `url(${logo})`
  }

  getColor(color:string) {
    return `${color}95`
  }

  getPlayerPicture(id: number) {
    return `url(https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg)`
  }

}
