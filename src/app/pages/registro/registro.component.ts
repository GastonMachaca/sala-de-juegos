import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,FormControl,FormGroup,Validators,ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { ValidacionesPropias } from 'src/app/components/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  
  public submitted = false;
  public message = "";
  public userFail : boolean = false;
  public usuarios : Array<string> = [];

  constructor(private registerService : RegisterService, private formBuilder : FormBuilder, private router : Router) {
    
  }

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.usuarios = this.registerService.userExists()
      ValidacionesPropias.traerUsuarios(this.usuarios);
    }, 2000);


    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            ValidacionesPropias.usuarioExistente
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [RegistroComponent.match('password', 'confirmPassword')]
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.registerService.register(this.form.value.email,this.form.value.password,this.form.value.username);

  }

  public onReset(): void {
    this.submitted = false;
    this.message = "";
    this.form.reset();
  }

  get username()
  {
    return this.form.get('username');
  }

}