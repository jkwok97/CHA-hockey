import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AwardsService } from 'src/app/_services/awards.service';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-awards',
  templateUrl: './team-awards.component.html',
  styleUrls: ['./team-awards.component.css']
})
export class TeamAwardsComponent implements OnInit, OnDestroy {
  
  private _alive: boolean = true;

  awards$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _awardsService: AwardsService,
    private _teamInfoService: TeamInfoService
    ) { 

      const teamSelected = this._route.snapshot.parent.params.team;

      this.getUserId(teamSelected)
      
    }

  getUserId(teamSelected: string) {
    this._teamInfoService.getUserByTeamName(teamSelected).pipe(
      takeWhile(() => this._alive)
    ).subscribe((id: number) => {
      const teamUserId = id['users_id'];
      this.awards$ = this._awardsService.getTeamAwardsByUserId(teamUserId);
    })
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

  ngOnDestroy(): void {
    this._alive = false;
  }

}
