import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  size_individual : number=0;
  size_team: number=0;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getSizeIndividual();
    this.getSizeTeam();
  }

  getSizeIndividual() {
    this.api.getTypeIndividual().subscribe({
      next: (response) => {
        this.size_individual = response.length
      }, error: err => {
        console.log(err)
      }
    })
  }
  
  getSizeTeam() {
    this.api.getTypeTeam().subscribe({
      next: (response) => {
        this.size_team = response.length
      }, error: err => {
        console.log(err)
      }
    })
  }

}
