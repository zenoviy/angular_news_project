import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { SingleNewsPageComponent } from './single-news-page/single-news-page.component';
import { NewsSourcePageComponent } from './news-source-page/news-source-page.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'users', component: AllUsersComponent},
  { path: ':id', component: NewsSourcePageComponent },
  { path: ':id/:term', component: SingleNewsPageComponent, runGuardsAndResolvers: 'always'},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
