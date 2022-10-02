import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  displayedColumns :String [] = ["id", "title", "businessId", "urlToImage","challengeType","action"]
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllChallenges();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    this.dialog.open(DialogComponent,{
      width: '30%'
    }).afterClosed().subscribe(result =>{
      if(result === 'save'){
        this.getAllChallenges();
      }
    })
  }

  getAllChallenges(){
  this.api.gatAllChallenges().subscribe({ next: response =>{
    this.dataSource =new MatTableDataSource(response)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }})
  }

  editChallenge(element :any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(result =>{
      if(result === 'update'){
        this.getAllChallenges();
      }
    })
  }

  deleteChallenge(id : number){
    var opciones = confirm("Desea eliminar el challenge?")
      if(opciones === true){
        this.api.deleteChallenge(id).subscribe({next: response =>{
          console.log(response);
        }})
        alert("Challenge eliminado correctamente")
        this.getAllChallenges();
      }
  }

}
