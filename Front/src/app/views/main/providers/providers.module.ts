import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProvidersComponent } from './providers.component';
import { ProvidersRoutingModule } from './providers-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    FormsModule,
    ProvidersRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [ProvidersComponent],
  providers: []
})
export class ProvidersModule { }
