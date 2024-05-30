import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  show:boolean = true;
  name:string = '';
  mensaje : string = "";
  usuarioLogueado : string;
  username : string = "";

  isShown:boolean = false;
  
  constructor(@Inject(DOCUMENT) document: any, private homeService : HomeService, private router : Router) 
  { 
    this.name = document.location.href;
    this.usuarioLogueado = "";
    
    this.homeService.getUsuarioLogueado().then((res : any) =>{

      if(res?.email == undefined)
      {
        router.navigate(['/login']);
      }
      
      this.usuarioLogueado = res?.email?.toString() ?? '';
    });

    this.homeService.traerColeccion("usuarios").subscribe(
      (prod : any) => {
        let json = JSON.stringify(prod);
        let usuarios : Array<any> = JSON.parse(json);

        usuarios.forEach(element => {
          if(element.email == this.usuarioLogueado)
          {    
              this.username = element.username;
              this.mensaje = "Welcome " + this.username + " to Game Center";
          }
        });
      }
    );
  }

  ngOnInit(): void {

    if(this.name.includes('/quienSoy'))
    {
      this.show = false;
    }
    if(this.name.includes('/games'))
    {
      this.show = false;
    }
    if(this.name.includes('/games/ahorcado'))
    {
      this.show = false;
    }

    if(this.name.includes('/games/mayorMenor'))
    {
      this.show = false;
    }

    if(this.name.includes('/games/preguntados'))
    {
      this.show = false;
    }

    if(this.name.includes('/games/fastEye'))
    {
      this.show = false;
    }

    if(this.name.includes('/encuesta'))
    {
      this.show = false;
    }

    if(this.name.includes('/resultadosEncuesta'))
    {
      this.show = false;
    }

    if(this.name.includes('/listadoPuntajes'))
    {
      this.show = false;
    }
  }


  cerrarSesion()
  {
    this.homeService.logOut();
  }

  seleccion()
  {
    this.isShown = false;
    this.show = false;
  }

  home()
  {
    this.isShown = false;
    this.show = true;
  }

}
