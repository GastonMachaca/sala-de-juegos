import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-listado-puntajes',
  templateUrl: './listado-puntajes.component.html',
  styleUrls: ['./listado-puntajes.component.scss']
})
export class ListadoPuntajesComponent implements OnInit{

  public juegoSeleccionado : string = "";

  public recordGameAhorcado : Array<any> = [];
  public recordGameMayorMenor : Array<any> = [];
  public recordGamePreguntados : Array<any> = [];
  public recordGameFastEye : Array<any> = [];

  public page! : number;

  constructor(public authService : AuthService)
  {

  }

  ngOnInit(): void {
    this.authService.traerColeccion('gameAhorcado').subscribe(result => {
      this.recordGameAhorcado = result;
    });
    this.authService.traerColeccion('gameMayorMenor').subscribe(result => {
      this.recordGameMayorMenor = result;
    });
    this.authService.traerColeccion('gamePreguntados').subscribe(result => {
      this.recordGamePreguntados = result;
    });
    this.authService.traerColeccion('gameFastEye').subscribe(result => {
      this.recordGameFastEye = result;
    });
  }
}
