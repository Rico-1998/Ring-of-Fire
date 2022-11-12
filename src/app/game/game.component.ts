import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  games$: Observable<any>;
  games: Array<any>;
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';
  // crud = create, read , update , delete

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    const coll = collection(firestore, 'games');
    this.games$ = collectionData(coll);

    // this.games$.subscribe((newGames) => {
    //   console.log('neue games sind', newGames);
    //   this.games = newGames;
    // })
  }

  ngOnInit(): void {
    this.newGame();
  }

  async newGame() {
    this.game = new Game();
    // const coll = collection(this.firestore, 'games');
    // setDoc(doc(coll), this.game.toJson());
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('new card' + this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
