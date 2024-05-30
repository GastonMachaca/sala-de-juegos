import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afauth: AngularFireAuth, public firestore : AngularFirestore,public router: Router) { }

  private alertMessage = (title: any,text: any,icon: any) =>
  {
    Swal.fire({ 
      toast: true, 
      position: 'top-end', 
      showConfirmButton: false,
      timer: 4000, 
      title, 
      text, 
      icon, 
    });
  }

  public login(email : string , password : string,fechaLogin : string)
  {
    return this.afauth.signInWithEmailAndPassword(email,password).then((result) => {

      this.alertMessage('Usuario Encontrado','Redirigiendo a Home... Espere unos segundos','success');

      const usuariosRef = this.firestore.collection('usuariosActivos');
      const usuarios = { "usuario": email, "fechaDeIngreso": fechaLogin };
      usuariosRef.add({ ...usuarios });

      setTimeout(() => {
        this.router.navigate(['home']);
      }, 3000);
    }).catch((error) => {

      switch(error.code)
      {
        case "auth/invalid-email": 
          this.alertMessage('Email no encontrado','No existe un usuario con el email ingresado','error');
          break;
        case "auth/wrong-password":
          this.alertMessage('Contraseña Incorrecta','Vuelva a intentarlo','error');
          break;
        default:
          this.alertMessage('Error al ingresar','Vuelva a intentarlo','error');
          break;
      }
    });      
  }

  async getUsuarioLogueado()
  {
    return await firstValueFrom(this.afauth.authState);
  }

  async verificarAdmin()
  {
    const user = await this.getUsuarioLogueado();
    
    return new Promise (resolve => {
      this.traerColeccion('usuarios').pipe(take(1)).subscribe((data : any) => {
        data.forEach((element : any) => {
          if(element.email == user?.email)
          {
            if(element.perfil == 'administrador')
            {
              resolve(true);
            }
          }
        });

        resolve(false);
      });

    });
  }

  public traerColeccion(nombreColeccion:string)
  {
    return this.firestore.collection(nombreColeccion).valueChanges();
  }
  
  public registrarEncuesta(dato : JSON)
  {
    const datoRef = this.firestore.collection('encuestas');
    const datos = dato;
    datoRef.add({ ...datos });
  }
  
}
