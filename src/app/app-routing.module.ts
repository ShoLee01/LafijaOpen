import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'business/challenges', component: ChallengesComponent },
  { path: '' , redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
