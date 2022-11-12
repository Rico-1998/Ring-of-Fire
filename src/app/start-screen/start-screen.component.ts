import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Firestore, collectionData, collection, setDoc, doc, addDoc } from '@angular/fire/firestore';
import { Game } from '../models/game';



@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  coll = collection(this.firestore, 'games');


  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
  }


  async newGame() {
    let game = new Game();
    this.router.navigateByUrl('/game');
    let gameInfo = await addDoc(this.coll, { game: game.toJson() });
    console.log('das ist gameinfo', gameInfo);
  }
}
