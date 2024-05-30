import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.scss']
})
export class ResultadosEncuestaComponent implements OnInit{

  public resultadosEncuesta : Array<any> = [];
  public page! : number;

  constructor(public authService : AuthService)
  {

  }

  ngOnInit(): void {
    this.authService.traerColeccion('encuestas').subscribe(result => {
      this.resultadosEncuesta = result;
    })


  }

}
