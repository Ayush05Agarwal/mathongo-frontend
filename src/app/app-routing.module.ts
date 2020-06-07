import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAppComponent } from '../app/login-app/login-app.component';
import { AppComponent } from '../app/app.component'
const routes: Routes = [
  { path: 'login',component:AppComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginAppComponent]
