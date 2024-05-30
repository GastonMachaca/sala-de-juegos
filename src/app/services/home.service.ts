import { Injectable } from '@angular/core';

import { AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {first, firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private afauth: AngularFireAuth ,private firestore: AngularFirestore,private router: Router) { }

  public getUsuarioLogueado()
  {
    return firstValueFrom(this.afauth.authState);
  }

  public traerColeccion(nombreColeccion:string)
  {
    return this.firestore.collection(nombreColeccion).valueChanges();
  }

  public logOut()
  {
    return this.afauth.signOut().then((result) => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    })

  }
}
