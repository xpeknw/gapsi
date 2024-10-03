import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
