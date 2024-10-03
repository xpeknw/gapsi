import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    FormsModule,
    WelcomeRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [ WelcomeComponent ],
  providers: [ ]
})
export class WelcomeModule { }
