import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {

  numeroCarta : number = 0;

  numeroAux : number = 0;
  puntos : number = 0;
  vueltas : number = 0;

  usuarioLogueado : string = "";
  username : string = "";
  mostrarCarta : boolean = false;
  pipe = new DatePipe('en-US');

  mensaje : string = "¿El numero de la 2da carta es mayor o menor a la 1ra?";
  mensajeNumero : any;

  constructor(private authService : AuthService, private gameService : GamesService) { 

    this.authService.getUsuarioLogueado().then((res) =>{

      this.usuarioLogueado = res?.email?.toString() ?? '';
    });

    this.authService.traerColeccion("usuarios").subscribe(
      prod => {
        let json = JSON.stringify(prod);
        let usuarios : Array<any> = JSON.parse(json);

        usuarios.forEach(element => {
          if(element.email == this.usuarioLogueado)
          {    
              this.username = element.username;
          }
        });
      }
    );

  }

  ngOnInit(): void {

    this.numeroCarta = this.random();

    this.numeroAux = this.randomAux(this.numeroCarta);
  }

  random()
  {
    let min = Math.ceil(1);
    let max = Math.floor(12);
    let num = Math.floor(Math.random() * (max - min) + min);

    return num;
  }

  randomAux(number : number)
  {
    let min = Math.ceil(1);
    let max = Math.floor(12);
    let num = Math.floor(Math.random() * (max - min) + min);

    while(num == number)
    {      
      min = Math.ceil(1);
      max = Math.floor(12);
      num = Math.floor(Math.random() * (max - min) + min);
    }

    return num;
  }

  mayor()
  {

    if(this.numeroCarta > this.numeroAux)
    {
      this.puntos++;
      this.vueltas++;
      this.numeroCarta = this.numeroAux;
      this.numeroAux = this.randomAux(this.numeroCarta);
      return;
    }

    alert('Se termino el juego - Acumulaste ' + this.puntos + ' puntos.');
    this.enviarResultado();
    this.puntos = 0;
    this.vueltas = 0;
  }

  menor()
  {

    if(this.numeroCarta < this.numeroAux)
    {
      this.puntos++;
      this.vueltas++;
      this.numeroCarta = this.numeroAux;
      this.numeroAux = this.randomAux(this.numeroCarta);
      return;
    }

    alert('Se termino el juego - Acumulaste ' + this.puntos + ' puntos.');
    this.enviarResultado();
    this.puntos = 0;
    this.vueltas = 0;
  }

  enviarResultado()
  {
    let fechaActual = this.pipe.transform(Date.now(), 'd-M-yy, h:mm a');
    let res : any = {
      username : this.username,
      puntaje : this.puntos,
      fecha : fechaActual
    }

    let json = JSON.stringify(res);
    let jsonParse = JSON.parse(json);

    this.numeroCarta = this.random();

    this.numeroAux = this.randomAux(this.numeroCarta);

    this.gameService.registrarResultado(jsonParse,'gameMayorMenor');

  }






}
