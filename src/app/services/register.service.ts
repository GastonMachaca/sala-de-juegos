import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public usuariosId : any[] = [];

  public dato: Date = new Date();
  public pipe = new DatePipe('en-US');

  private alertMessage = (title: any,text: any,icon: any) =>
  {
    Swal.fire({ 
      toast: true, 
      position: 'top-end', 
      showConfirmButton: false,
      timer: 3000, 
      title, 
      text, 
      icon, 
    });
  }

  constructor(public afauth: AngularFireAuth, public firestore : AngularFirestore,public router: Router, public authService : AuthService) {
    this.firestore.collection('usuarios').get().toPromise().then((snapshot) => {
      this.usuariosId = [];
      snapshot?.forEach((doc) => {
        this.usuariosId.push(doc.id);
      }); 
    })
  }

  public register(email: string , password : string, username : string)
  {
      return this.afauth.createUserWithEmailAndPassword(email,password).then((result) => {

        this.alertMessage('Usuario generado con exito','Redirigiendo a Home... Espere unos segundos','success');

        this.firestore.collection("usuarios").doc(username).set({email : email, username : username});

        let fechaActual = this.pipe.transform(Date.now(), 'd/M/yy, h:mm a');

        this.authService.login(email,password,fechaActual || '').then(result => {
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        });

      }).catch((error) => {

        switch(error.code)
        {
          case "auth/email-already-in-use": 
            this.alertMessage('Email existente','El email ingresado ya esta vinculado a un usuario','error');
            break;
          default:
            this.alertMessage('Error al ingresar','Vuelva a intentarlo','error');
            break;
        }

      });
  }

  public userExists()
  {
      return this.usuariosId;
  }

}
