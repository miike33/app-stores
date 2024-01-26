import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IGame } from "src/app/models/store.model";
import { HttpStoreService } from "src/app/services/http-store.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "game",
  templateUrl: "game.component.html",
})
export class GameComponent implements OnInit {
  @Input() public gameId!: number;
  @Output() onCloseModal = new EventEmitter<boolean>();

  public game: IGame;

  constructor(
    private httpStoreService: HttpStoreService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    console.log(this.gameId);
    this.httpStoreService.getGameById(this.gameId).subscribe((game) => {
      this.game = this.storeService.getMappedGame(game);
    });
  }

  showModal(myModal): boolean {
    if (!myModal._isShown) {
      myModal.show();
    }
    return true;
  }

  closeModal(mymodal): void {
    mymodal.hide();
    this.onCloseModal.emit(false);
  }
}
