import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';

import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { GamesComponent } from './games-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { FastEyeComponent } from './fast-eye/fast-eye.component';


@NgModule({
  declarations: [MayorMenorComponent,AhorcadoComponent,GamesComponent,PreguntadosComponent,FastEyeComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class GameModule { }
