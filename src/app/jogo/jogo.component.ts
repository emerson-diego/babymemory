import { Component, OnInit } from '@angular/core';
import {trigger,state ,style ,animate, transition} from '@angular/animations';

import { Baby } from './baby.model';
import { Card } from './card.model';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  constructor() {}

  babyies: Baby[];
  painelJogo: Card[];
  inicioJogo: boolean;
  cardChutado1: Card;
  cardChutado2: Card;

  ngOnInit() {


    this.babyies = [
      { id: 1, nome: 'Murilo', foto: 'murilo_.png' },
      { id: 2, nome: 'Davi', foto: 'davi_.png' },
      { id: 3, nome: 'Sara', foto: 'sara_.png' },
      { id: 4, nome: 'Isabela', foto: 'isabela_.png' },
      { id: 5, nome: 'Oculto', foto: 'oculto_.png' }
    ];

    this.painelJogo = [
      { id: 1, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 2, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 3, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 4, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 5, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 6, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 7, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] },
      { id: 8, ocupado: false, encontrado: false, chutado: false, baby: this.babyies[4] }
    ];

    this.start();
  }

  start() {

    this.inicioJogo = true;

    this.limpaTudo();

    for (let i = 0; i < 4; i++) {
      let numeroSorteado: number = Math.floor(Math.random() * 7);
      console.log(numeroSorteado);

      if (this.painelJogo[numeroSorteado].ocupado === true) {
        numeroSorteado = this.getProximoCardLivre(numeroSorteado + 1);
      }

      if (numeroSorteado !== -1) {
        this.painelJogo[numeroSorteado].ocupado = true;
        this.painelJogo[numeroSorteado].baby = this.babyies[i];
      }

      this.mostraPainel();

      numeroSorteado = Math.floor(Math.random() * 7);
      console.log(numeroSorteado);

      if (this.painelJogo[numeroSorteado].ocupado === true) {
        numeroSorteado = this.getProximoCardLivre(numeroSorteado + 1);
      }

      if (numeroSorteado !== -1) {
        this.painelJogo[numeroSorteado].ocupado = true;
        this.painelJogo[numeroSorteado].baby = this.babyies[i];
      }

      this.mostraPainel();
    }

    setTimeout(() => {
      this.inicioJogo = false;
    }, 2000);


  }

  getProximoCardLivre(numeroSorteado: number): number {
    if (numeroSorteado === 8) {
      numeroSorteado = 0;
    }

    for (
      let cardLivre = numeroSorteado;
      cardLivre < this.painelJogo.length;
      cardLivre++
    ) {
      if (this.painelJogo[cardLivre].ocupado === false) {
        return cardLivre;
      }
    }

    for (
      let cardLivre = this.painelJogo.length - 1;
      cardLivre >= 0;
      cardLivre--
    ) {
      console.log('erro ' + this.painelJogo.length);
      console.log('erro ' + cardLivre);
      if (this.painelJogo[cardLivre].ocupado === false) {
        return cardLivre;
      }
    }

    return -1;
  }

  limpaTudo() {
    for (let i = 0; i < this.painelJogo.length; i++) {
      this.painelJogo[i].ocupado = false;
      this.painelJogo[i].encontrado = false;
    }
  }

  mostraPainel() {
    for (let i = 0; i < this.painelJogo.length; i++) {
      console.log(this.painelJogo[i].baby.nome);
    }
  }

  chute(card: Card) {

    card.chutado = true;

    let numeroCardsChutados = this.getCardsChutados();

    if(numeroCardsChutados == 1){
     this.cardChutado1 = card;
    }

    if(numeroCardsChutados == 2){
      this.cardChutado2 = card;

      setTimeout(() => {



      if(this.cardChutado1.baby.nome === this.cardChutado2.baby.nome){
        this.cardChutado1.encontrado = true;
        this.cardChutado2.encontrado = true;
      }

        this.cardChutado1.chutado = false;
        this.cardChutado2.chutado = false;

      }, 1000);

    }

  }

  getCardsChutados():number {
    let cardsChutados = 0;
    for (let i = 0; i < this.painelJogo.length; i++) {
      if (this.painelJogo[i].chutado === true) {
        cardsChutados++;
      }
    }
    return cardsChutados;
  }
}
