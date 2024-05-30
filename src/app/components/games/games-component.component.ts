import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-component',
  templateUrl: './games-component.component.html',
  styleUrls: ['./games-component.component.scss']
})
export class GamesComponent implements OnInit {

  mostrarJuego : Boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
