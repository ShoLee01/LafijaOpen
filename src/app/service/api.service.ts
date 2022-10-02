import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath= "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  getTypeIndividual(){
    return this.http.get<any>(this.basePath + "challenges?challengeType=individual")
  }

  getTypeTeam(){
    return this.http.get<any>(this.basePath + "challenges?challengeType=team")
  }

  gatAllChallenges(){
    return this.http.get<any>(this.basePath + "challenges")
  }
  postChallenge(data: any){
    return this.http.post<any>(this.basePath + "challenges", data)
  }
  updateChallenge(data: any, id: any){
    return this.http.put<any>(this.basePath + "challenges" + id, data)
  }
  deleteChallenge(id: any){
    return this.http.delete<any>(this.basePath + "challenges/" + id)
  }
}
