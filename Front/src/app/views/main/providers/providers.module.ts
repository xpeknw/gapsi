import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProvidersComponent } from './providers.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    FormsModule,
    ProvidersRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule


  ],
  declarations: [ProvidersComponent],
  providers: []
})
export class ProvidersModule { }
