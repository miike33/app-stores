import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpStoreService } from "src/app/services/http-store.service";
import { switchMap, tap } from "rxjs";
import { IGame, IStore, IStoreGame } from "src/app/models/store.model";
import { StoreService } from "src/app/services/store.service";
import { StorePageLiterals } from "src/app/constants/pages.constants";

@Component({
  selector: "app-store-page",
  templateUrl: "store-page.component.html",
})
export class StorePageComponent implements OnInit {
  public literals = StorePageLiterals;
  public storeList: IStore[] = [];
  public storeDetails: IStore;
  public selectedGameId: number;
  public showGameModal: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpStoreService: HttpStoreService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.setStoreListAndDetails();
  }

  private setStoreListAndDetails(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.httpStoreService.getStoreById(id)),
        tap(
          (resp) => (this.storeDetails = this.storeService.getMappedStore(resp))
        ),
        switchMap(() => this.httpStoreService.getStoreList()),
        tap(
          (list) =>
            (this.storeList = this.storeService.getMappedStoreList(list))
        )
      )
      .subscribe();
  }

  public getGames(): IStoreGame[] {
    const games: IStoreGame[] = this.storeList?.find(
      (store: IStore) => store.id === this.storeDetails.id
    )?.games;

    return games || [];
  }

  public onClickGame(gameId: number, myModal: any): void {
    this.selectedGameId = gameId;
    this.showGameModal = true;
    myModal.show();
  }

  public closeModal(myModal: any): void {
    myModal.hide();
    this.showGameModal = false;
  }
}
