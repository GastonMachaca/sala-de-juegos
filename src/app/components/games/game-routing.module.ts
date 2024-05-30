import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { GamesComponent } from './games-component.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { FastEyeComponent } from './fast-eye/fast-eye.component';

const routes: Routes = [

  { path : '',
    children : [
      {path : 'mayorMenor' , component : MayorMenorComponent},
      {path : 'ahorcado' , component : AhorcadoComponent},
      {path : 'preguntados' , component : PreguntadosComponent},
      {path : 'fastEye' , component : FastEyeComponent},
    ]


  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
