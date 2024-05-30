import { Component,OnInit  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  dato: Date = new Date();
  pipe = new DatePipe('en-US');
  fechaActual : any = null;

  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router)
  {

  }

  public frmUsuario = this.formBuilder.group({
    usuario : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
  });
  
  ngOnInit(): void {
    this.fechaActual = this.pipe.transform(Date.now(), 'd/M/yy, h:mm a');
  }

  public Login()
  {
    this.authService.login(this.frmUsuario.controls['usuario'].value || '',this.frmUsuario.controls['password'].value || '',this.fechaActual);
  }

  public quickAccess()
  {
    this.frmUsuario.controls['usuario'].setValue("example@hotmail.com");
    this.frmUsuario.controls['password'].setValue("123456");

    this.Login();
  }

  public quickAccessAdministrador()
  {
    this.frmUsuario.controls['usuario'].setValue("admin@hotmail.com");
    this.frmUsuario.controls['password'].setValue("123456");

    this.Login();
  }
  
}
