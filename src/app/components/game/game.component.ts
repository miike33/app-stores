import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IGame } from "src/app/models/store.model";
import { HttpStoreService } from "src/app/services/http-store.service";
import { StoreService } from "src/app/services/store.service";
import { GameLiterals } from "../constants/components.constants";

@Component({
  selector: "game",
  templateUrl: "game.component.html",
})
export class GameComponent implements OnInit {
  @Input() public gameId!: number;
  @Output() onCloseModal = new EventEmitter<void>();

  public game: IGame;
  public literals = GameLiterals;

  constructor(
    private httpStoreService: HttpStoreService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.httpStoreService.getGameById(this.gameId).subscribe((game) => {
      this.game = this.storeService.getMappedGame(game);
    });
  }

  closeModal(): void {
    this.onCloseModal.emit();
  }
}
