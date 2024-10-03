import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    FormsModule,
    MainRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [MainComponent],
  providers: []
})
export class MainModule { }
