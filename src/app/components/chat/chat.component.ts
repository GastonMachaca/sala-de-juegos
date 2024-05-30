import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
// import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje : string = "";
  elemento : any;

  usuarioLogueado : string = "";
  username : string = "";
  pipe = new DatePipe('en-US');

  constructor(public chatService : ChatService, public authService : AuthService) { 

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

    this.chatService.cargarMensajes().subscribe(() =>{
      setTimeout(() =>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);

    });
  }

  ngOnInit(): void {

    this.authService.getUsuarioLogueado().then((res) =>{
      this.usuarioLogueado = res?.email?.toString() ?? '';
      this.elemento = document.getElementById('app-mensajes');
    });

  }

  enviarMensaje()
  {

    if(this.mensaje.length == 0)
    {
      return;
    }

    let fechaActual = this.pipe.transform(Date.now(), 'h:mm a');
    // this.chatService.agregarMensaje(this.usuarioLogueado,this.mensaje,fechaActual).then(() => this.mensaje= "")
    // .catch((error : any) => console.log('Error al enviar',error));

    this.chatService.returnMensaje(this.usuarioLogueado,this.mensaje,fechaActual).then(result => {
      this.mensaje= "";
    });
    
  }

}
