import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuienSoyComponent } from 'src/app/components/quien-soy/quien-soy.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoPuntajesComponent } from 'src/app/components/listado-puntajes/listado-puntajes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from 'src/app/components/resultados-encuesta/resultados-encuesta.component';


@NgModule({
  declarations: [HomeComponent,QuienSoyComponent,ChatComponent,ListadoPuntajesComponent,EncuestaComponent,ResultadosEncuestaComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule

  ]
})
export class HomeModule { }
