import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  usuarioLogueado : string = "";
  username : string = "";
  pipe = new DatePipe('en-US');

  informacion : any = [];
  otrosPersonajes : Array<string> =[];
  copiaPersonajes : Array<string> =[];
  auxiliarPersonajes : Array<string> = [];
  mostrarTitulo : boolean = true;
  inGame : boolean = false;
  pregunta : boolean = false;
  endGame : boolean = false;
  personaje : any;
  puntuacion : number = 0;

  public numeroPersonaje1 : number = 0;
  public numeroPersonaje2 : number = 0;
  public numeroPersonaje3 : number = 0;
  public numeroPersonaje4 : number = 0;

  public personajeSeleccionado : any;

  constructor(private gameService : GamesService,private authService :AuthService) 
  { 
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

  ngOnInit(): void 
  {
      this.inGame = true;
    // this.numeroPersonaje1 = this.random();

    // this.numeroPersonaje2 = this.randomAux(this.numeroPersonaje1);

    // this.numeroPersonaje3 = this.randomAux(this.numeroPersonaje2);

    // this.numeroPersonaje4 = this.randomAux(this.numeroPersonaje4);

    // console.log(this.numeroPersonaje1);
    // console.log(this.numeroPersonaje2);
    // console.log(this.numeroPersonaje3);
    // console.log(this.numeroPersonaje4);

    // this.gameService.getPersonajesRickAndMorty(this.numeroPersonaje1,this.numeroPersonaje2,this.numeroPersonaje3,this.numeroPersonaje4).subscribe(personajes =>{
    //   this.informacion = personajes;
    //   this.inGame = true;
    //   console.log(personajes);

    //   this.personajeSeleccionado =  this.informacion[Math.floor(Math.random() * this.informacion.length)];

    // })

    // this.gameService.getPersonajes().subscribe(personajes =>{
    //   this.informacion = personajes;
    //   this.inGame = true;
    //   console.log(this.informacion);
    // })
  }

  random()
  {
    let min = Math.ceil(1);
    let max = Math.floor(12);
    let num = Math.floor(Math.random() * (max - min) + min);

    return num;
  }

  newGame()
  {
    this.puntuacion = 0;
    this.pregunta = true;
    this.inGame = false;
    this.endGame = false;

    this.newPersonaje();

    // if(this.endGame == true)
    // {
    //   this.puntuacion = 0;
    // }

    // this.auxiliarPersonajes = [];
    // this.mostrarTitulo = false;
    // this.inGame = false;
    // this.endGame = false;

    // let min = Math.ceil(0);
    // let max = Math.floor(61);
    // let num = Math.floor(Math.random() * (max - min) + min);

    // this.personaje = this.informacion[num];

    // if(this.personaje.name == "Holly White")
    // {
    //   this.personaje.img = "https://i.pinimg.com/originals/2f/05/61/2f0561e02700247edc7cdd9ca703e349.jpg";
    // }

    // this.otrosPersonajes.push(this.personaje.name);

    // for(let i = 0; i < 4; i++)
    // {
    //   let aux = this.randomAux(num);
    //   let pAux = this.informacion[aux];

    //   num = aux;

    //   this.otrosPersonajes.push(pAux.name);
    // }

    // this.permutaSinRepe();

    // this.pregunta = true;

  }

  permutaSinRepe(){

    for(let i = 0;i< this.otrosPersonajes.length;i++)
    {
      this.copiaPersonajes.push(this.otrosPersonajes[i]);
    }

    console.log(this.copiaPersonajes);

    for(let i = 0; i<5;i++)
    {
      if(this.otrosPersonajes.length == 0)
      {
        break;
      }

      const random = Math.floor(Math.random() * this.otrosPersonajes.length);
      
      var newArray = this.otrosPersonajes.splice(random,1);

      this.auxiliarPersonajes.push(newArray[0]);

    }
  
  }

  randomAux(number : number)
  {
    let min = Math.ceil(1);
    let max = Math.floor(61);
    let num = Math.floor(Math.random() * (max - min) + min);

    while(num == number)
    {      
      min = Math.ceil(1);
      max = Math.floor(61);
      num = Math.floor(Math.random() * (max - min) + min);
    }

    return num;
  }

  // randomAux(number : number)
  // {
  //   let min = Math.ceil(1);
  //   let max = Math.floor(12);
  //   let num = Math.floor(Math.random() * (max - min) + min);

  //   while(num == number)
  //   {      
  //     min = Math.ceil(1);
  //     max = Math.floor(12);
  //     num = Math.floor(Math.random() * (max - min) + min);
  //   }

  //   return num;
  // }

  enviarResultado()
  {
    let fechaActual = this.pipe.transform(Date.now(), 'd-M-yy, h:mm a');
    let res : any = {
      username : this.username,
      puntaje : this.puntuacion,
      fecha : fechaActual
    }

    let json = JSON.stringify(res);
    let jsonParse = JSON.parse(json);

    this.gameService.registrarResultado(jsonParse,'gamePreguntados');
  }
  
  public newPersonaje()
  {
    this.numeroPersonaje1 = this.random();

    this.numeroPersonaje2 = this.randomAux(this.numeroPersonaje1);

    this.numeroPersonaje3 = this.randomAux(this.numeroPersonaje2);

    this.numeroPersonaje4 = this.randomAux(this.numeroPersonaje4);

    this.gameService.getPersonajesRickAndMorty(this.numeroPersonaje1,this.numeroPersonaje2,this.numeroPersonaje3,this.numeroPersonaje4).subscribe(personajes =>{
      this.informacion = personajes;
      // this.inGame = true;
      console.log(personajes);

      this.personajeSeleccionado =  this.informacion[Math.floor(Math.random() * this.informacion.length)];

    })
  }

  eleccion(personaje : string)
  {
    console.log(personaje);

    // console.log(this.personaje.name);

    if(personaje == this.personajeSeleccionado.name)
    {
      console.log("Punto conseguido");
      this.auxiliarPersonajes = [];
      this.puntuacion++;
      this.newPersonaje();
    }
    else
    {
      this.endGame = true;
      this.pregunta = false;
      this.enviarResultado();
    }

  }


}
