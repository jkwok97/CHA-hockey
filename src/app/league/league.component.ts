import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  northwestTeams = [
    { name: "Seattle Storm", shortName: "SEA", image: "../../assets/team_logos/Storm.jpg" },
    { name: "Oakland Assassins", shortName: "OAK", image: "../../assets/team_logos/Assassins.jpg" },
    { name: "Kelowna Mountaineers", shortName: "KEL", image: "../../assets/team_logos/Mountaineers.jpg" },
    { name: "Victoria Vipers", shortName: "VIC", image: "../../assets/team_logos/Vipers.jpg" },
    { name: "San Francisco Fighting Cocks", shortName: "SFC", image: "../../assets/team_logos/Cocks.jpg" },
  ]

  southwestTeams = [
    { name: "Memphis Hound Dogs", shortName: "MEM", image: "../../assets/team_logos/HoundDogs.jpg" },
    { name: "Oklahoma City Oil Barons", shortName: "OKL", image: "../../assets/team_logos/OilBarons.jpg" },
    { name: "Cheyenne Desperado", shortName: "CHY", image: "../../assets/team_logos/Desperado.jpg" },
    { name: "Wichita Wolfpack", shortName: "WIC", image: "../../assets/team_logos/Wolfpack.jpg" },
    { name: "Lone Star Brahmas", shortName: "LSB", image: "../../assets/team_logos/Brahmas.jpg" },
  ]

  northeastTeams = [
    { name: "Milwaukee Ice Dragons", shortName: "MIL", image: "../../assets/team_logos/Dragons.jpg" },
    { name: "Indianapolis Goats", shortName: "IND", image: "../../assets/team_logos/Goats.jpg" },
    { name: "Peoria Prowlers", shortName: "PEO", image: "../../assets/team_logos/Prowlers.jpg" },
    { name: "Mississauga North Stars", shortName: "MSG", image: "../../assets/team_logos/NorthStars.jpg" },
    { name: "Green Bay Glory", shortName: "GRE", image: "../../assets/team_logos/Glory.jpg" },
  ]

  southeastTeams = [
    { name: "Augusta Green Jackets", shortName: "AUG", image: "../../assets/team_logos/GreenJackets.jpg" },
    { name: "Staten Island Killer Bees", shortName: "STA", image: "../../assets/team_logos/KillerBees.jpg" },
    { name: "Cincinnati Cyclones", shortName: "CIN", image: "../../assets/team_logos/Cyclones.jpg" },
    { name: "South Carolina Stingrays", shortName: "SCS", image: "../../assets/team_logos/Rays.jpg" },
    { name: "Atlanta Flashers", shortName: "ATL", image: "../../assets/team_logos/Flashers.jpg" },
  ]

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  sendToTeam(team) {
    this._router.navigate([`teams/${team}`]);
  }

}
