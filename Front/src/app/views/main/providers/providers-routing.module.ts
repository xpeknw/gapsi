import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
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
export class ProvidersRoutingModule {}
