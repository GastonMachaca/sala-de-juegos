import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';


export class ValidacionesPropias {

    static usuarios: Array<string> = [];

    static traerUsuarios(usuarios : any)
    {
        ValidacionesPropias.usuarios = usuarios;
    }

    static usuarioExistente(control: AbstractControl): ValidationErrors| null {
        
        let aux : Boolean = true;

        ValidacionesPropias.usuarios.forEach(element => {
            if(control.value != null)
            {
                if(control.value.toLowerCase() == element.toLowerCase())
                {   
                    aux = false;  
                }
            }
        });

        if (aux)
        return null;
        else
        return { usuarioExistente: true }
    }
}