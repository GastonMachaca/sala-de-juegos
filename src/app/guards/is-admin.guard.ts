import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard {

  public isAdmin : boolean = false;

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

  constructor(public authService : AuthService)
  {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.checkAdmin(route);
  }
  
  async checkAdmin(route : ActivatedRouteSnapshot)
  {
      const user = await this.authService.verificarAdmin();

      console.log(user);
      
      if(user == false)
      {
          this.alertMessage('Acceso Denegado','No eres un administrador para acceder a esta ruta','warning');
      }

      return user;
  }
}
