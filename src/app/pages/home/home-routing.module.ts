import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { QuienSoyComponent } from 'src/app/components/quien-soy/quien-soy.component';
import { GamesComponent } from 'src/app/components/games/games-component.component';
import { ListadoPuntajesComponent } from 'src/app/components/listado-puntajes/listado-puntajes.component';
import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from 'src/app/components/resultados-encuesta/resultados-encuesta.component';
import { IsAdminGuard } from 'src/app/guards/is-admin.guard';

const routes: Routes = [
  {
    path : '' , component : HomeComponent,
    children : [
      {path : 'quienSoy' , component : QuienSoyComponent},  
      {path : 'listadoPuntajes' , component : ListadoPuntajesComponent}, 
      {path : 'encuesta' , component : EncuestaComponent},  
      {path : 'resultadosEncuesta' , component : ResultadosEncuestaComponent, canActivate : [IsAdminGuard]},  
      { path : 'games',component : GamesComponent, 
      loadChildren : () => import('../../components/games/game.module').then( m => m.GameModule)},
      {path : '**' , redirectTo : ''}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
