import { DatePipe } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
// import { AuthService } from 'src/app/servicios/auth.service';
// import { GamesService } from 'src/app/servicios/games.service';

@Component({
  selector: 'app-fast-eye',
  templateUrl: './fast-eye.component.html',
  styleUrls: ['./fast-eye.component.scss']
})
export class FastEyeComponent implements OnInit,AfterViewInit {

  puntos : number = 0;
  transformVal = "";
  timer = 5;

  pipe = new DatePipe('en-US');
  
  usuarioLogueado : string = "";
  username : string = "";
  gameInit : boolean = false;
  

  private screenSize = {
    x : 0,
    y : 0
  }

  @ViewChild('gameBody') gameBody : ElementRef | undefined

  ngOnInit(): void {
    interval(1000).subscribe(() =>{
      if(this.gameInit)
      {
        if(this.timer > 0)
        {
          this.timer--;
        }else
        {
          this.targetMissed();
        }
      }
      else
      {
        this.timer = 5;
      }
    })
  }


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

  ngAfterViewInit(): void {
    this.screenSize.x = this.gameBody?.nativeElement.clientWidth;
    this.screenSize.y = this.gameBody?.nativeElement.clientHeight;

    setTimeout(() => {
      this.generateRandomTranslate();
    });

  }

  targetClicked(event : MouseEvent)
  {
    this.puntos++;
    this.generateRandomTranslate();
    this.gameInit = true;
    event.stopPropagation();
  }

  targetMissed()
  {
    alert('Game over - Puntos: ' + this.puntos);
    this.gameInit = false;
    let fechaActual = this.pipe.transform(Date.now(), 'd-M-yy, h:mm a');

    let res : any = {
      username : this.username,
      puntaje : this.puntos,
      fecha : fechaActual
    }

    let json = JSON.stringify(res);
    let jsonParse = JSON.parse(json);

    this.gameService.registrarResultado(jsonParse,'gameFastEye');

    this.puntos = 0;
  }

  private generateRandomTranslate()
  {
    let xVal = Math.random() * this.screenSize.x -50;
    let yVal = Math.random() * this.screenSize.y -50;

    this.transformVal = `translate(${xVal}px, ${yVal}px)`;
  }
}
