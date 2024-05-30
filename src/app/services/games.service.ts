import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private firestore: AngularFirestore,private http: HttpClient) { }

  
  public getPaises()
  {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  public getPersonajesRickAndMorty(numero1 : number,numero2 : number,numero3 : number,numero4 : number)
  {
    return this.http.get('https://rickandmortyapi.com/api/character/'+ [numero1,numero2,numero3,numero4])
  }

  public registrarResultado(dato : JSON,coleccion : string)
  {      
    const resultadoRef = this.firestore.collection(coleccion);
    const resultados = dato;
    resultadoRef.add({ ...resultados }); 
  }

  



}
