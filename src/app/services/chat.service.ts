import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interfaces/mensajeInteface'
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats : Mensaje[] = [];

  public usuarioLogueado : string = "";
  public username : string = "";

  private itemsCollection : AngularFirestoreCollection<Mensaje>

  constructor(private firestore : AngularFirestore, private authService : AuthService) { 

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

    this.itemsCollection = firestore.collection<any>('chats');
  }

  cargarMensajes()
  {
    this.itemsCollection = this.firestore.collection<Mensaje>('chats', ref => ref.orderBy('fechaAux','desc'));

    return this.itemsCollection.valueChanges().pipe(map((mensaje : Mensaje[])=> {
      console.log(mensaje);
      //this.chats = mensaje;
      this.chats = [];

      for(let msg of mensaje)
      {
        this.chats.unshift(msg);
      }

      return this.chats;
    }))
  }

  agregarMensaje(username : string,texto : string, fecha : any)
  {
    let mensaje : Mensaje = {
      nombre : username,
      fecha : fecha,
      fechaAux : new Date().getTime(),
      mensaje : texto,
      uid : username
    }

    return this.itemsCollection.add(mensaje);
  }

  public returnMensaje(email : string,texto : string, fecha : any)
  {
    return new Promise (resolve => {
      this.authService.traerColeccion('usuarios').pipe(take(1)).subscribe((data : any) => {
        data.forEach((element : any) => {
          console.log(element);
          if(element.email == email)
          {
              let mensaje : Mensaje = {
                nombre : element.username,
                fecha : fecha,
                fechaAux : new Date().getTime(),
                mensaje : texto,
                uid : element.username
              }

              resolve(this.itemsCollection.add(mensaje));

          }
        });

        resolve(false);
      });

    });
  }


}
