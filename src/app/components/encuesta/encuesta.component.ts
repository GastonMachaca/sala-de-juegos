import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {


  public generos : Array<string> = ['Masculino','Femenino','Ninguno de los mencionados'];

  formAltaRepartidor: FormGroup = new FormGroup({
    apellido: new FormControl(''),
    nombre: new FormControl(''),
    edad: new FormControl(''),
    numeroTelefono: new FormControl(''),
    mejoras: new FormControl(''),
    calificacion : new FormControl(''),
    genero : new FormControl('')
  });

  submitted = false;

  json = "";
  
  constructor(private formBuilder : FormBuilder, private conexionService : AuthService) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formAltaRepartidor.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formAltaRepartidor.invalid) {
      return;
    }
    console.log(this.formAltaRepartidor.value);
    
    this.json = JSON.stringify(this.formAltaRepartidor.value, null, 2);

    this.conexionService.registrarEncuesta(JSON.parse(this.json));

    alert("Exito");
  }

  actualizarPais(pais:any)
  {
    this.formAltaRepartidor.get('paisOrigen')?.setValue(pais.name);
  }

  ngOnInit(): void 
  {
    this.formAltaRepartidor = this.formBuilder.group(
      {
          apellido: [null, Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')
        ])],
          nombre: [null, Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')
        ])],
          edad: [null, Validators.compose([
            Validators.required,
            Validators.min(18),
            Validators.max(99),
            Validators.pattern('^[0-9]*$')
        ])],
          numeroTelefono: [null, Validators.compose([
            Validators.required,
            // Validators.minLength(10),
            // Validators.maxLength(10),
            Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}/)
        ])],
          mejoras: [null, Validators.compose([
            Validators.required
        ])],
          calificacion: [null, Validators.compose([
            Validators.required
        ])],
          genero: [null, Validators.compose([
            Validators.required
          ])]

      }
    );
  }

}
