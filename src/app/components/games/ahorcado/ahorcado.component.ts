import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  maxWrong:number=6;
  answer:string = '';
  mistakes:number = 0;
  guessed:any[] = [];
  keyboard:any[]=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  wordStatus:any = null;
  pipe = new DatePipe('en-US');
  
  usuarioLogueado : string = "";
  username : string = "";
  
  constructor(private authService: AuthService, private gameService : GamesService) {
    setTimeout(()=>{
      this.randomWord();
      this.guessedWord();
    },100)

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
  }
  superheroes = [
    "batman",
    "superman",
    "flash",
    "shazam",
    "aquaman",
    "robin",
    "starfire",
    "arrow",
    "supergirl",
    "constantine",
    "nightwing",
    "raven",
    "catwoman",
    "atom",
    "firestorm",
    "cyborg",
  ]
  
  randomWord() {
    this.answer =this.superheroes[Math.floor(Math.random() * this.superheroes.length)];
  }
  
  handleGuess(chosenLetter:string) {
    this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
    (<HTMLInputElement>document.getElementById(chosenLetter)).setAttribute('disabled', 'true');
  
    if (this.answer.indexOf(chosenLetter) >= 0) {
      this.guessedWord();
      this.checkIfGameWon();
    } else if (this.answer.indexOf(chosenLetter) === -1) {
      this.mistakes++;
      this.checkIfGameLost();
      this.updateHangmanPicture();
    }
  }
  updateHangmanPicture() {
    switch(this.mistakes)
    {
          case 1:
            (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F1.png?alt=media&token=66ff5ed5-fc59-4e75-9282-08ad0f63a0a3';
              break;
          case 2:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F2.png?alt=media&token=b9e5b917-eaf1-433e-8db9-376f88f962cd';
              break;
          case 3:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F3.png?alt=media&token=2a8ee1b0-8dca-4e49-9ba5-779fb1dd0aa8';
              break;
          case 4:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F4.png?alt=media&token=5b43068a-fd6a-4c72-80ed-2425308519fd';
              break;
          case 5:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F5.png?alt=media&token=16b60fe7-0d2a-41cd-ae7a-012ede6a28f6';
              break;
          case 6:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F6.png?alt=media&token=2f09b4e1-7689-4842-be71-7d417b98bd24';
          break;
          default:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F0.png?alt=media&token=259763ce-43c0-478f-a27c-57d28201c26d';
              break;
    }
  }
  checkIfGameWon() {
    if (this.wordStatus == this.answer) {
      alert('Ganaste - Se registro tu partida en la base de datos');
      this.addScore();
      this.keyboard.forEach(element => {
        (<HTMLInputElement>document.getElementById(element)).setAttribute('disabled', 'true');
      });
    }
  }
  addScore(){

    let fechaActual = this.pipe.transform(Date.now(), 'd-M-yy, h:mm a');

    let res : any = {
      username : this.username,
      puntaje : 6 - this.mistakes,
      fecha : fechaActual
    }

    let json = JSON.stringify(res);
    let jsonParse = JSON.parse(json);

    this.gameService.registrarResultado(jsonParse,'gameAhorcado');

  }
  checkIfGameLost() {
    if (this.mistakes == this.maxWrong) {
      (<HTMLInputElement>document.getElementById('wordSpotlight')).innerHTML = 'La respuesta correcta era: ' + this.answer;
      (<HTMLInputElement>document.getElementById('hangmanPic')).innerHTML = 'You lose';
      alert('Se registro su partida en la base de datos');
      this.addScore();
      this.keyboard.forEach(element => {
        (<HTMLInputElement>document.getElementById(element)).setAttribute('disabled', 'true');
      });
    }
  }
  reset() {
    this.mistakes = 0;
    this.guessed = [];
    (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/formulario-81c3a.appspot.com/o/imagenes%20juegos%2Fahorcado%2F0.png?alt=media&token=259763ce-43c0-478f-a27c-57d28201c26d';
    this.keyboard.forEach(element => {
      (<HTMLInputElement>document.getElementById(element)).removeAttribute('disabled');
    });
    this.keyboard=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    this.randomWord();
    this.guessedWord();
  }
  guessedWord() {
    this.wordStatus = this.answer.split('').map(letter => (this.guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    (<HTMLInputElement>document.getElementById('wordSpotlight')).innerHTML = this.wordStatus;
  }
}
