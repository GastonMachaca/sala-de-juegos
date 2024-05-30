import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuarioActivoGuard } from './guards/usuario-activo.guard';
import { AuthHomeGuard } from './guards/auth-home.guard';

const routes: Routes = [

  {path : 'home', loadChildren : () => import('./pages/home/home.module').then( m => m.HomeModule), canActivate : [AuthHomeGuard]},
  {path : 'login', component : LoginComponent,canActivate : [UsuarioActivoGuard]},
  {path : 'registro', component : RegistroComponent},
  { path : '**', redirectTo : 'login' , pathMatch : 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
