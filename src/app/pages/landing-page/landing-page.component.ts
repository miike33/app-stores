import { Component, OnInit } from "@angular/core";
import { IStore } from "src/app/models/store.model";
import { HttpStoreService } from "src/app/services/http-store.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "landing-page.component.html",
})
export class LandingPageComponent implements OnInit {
  public storeList: IStore[] = [];

  constructor(
    private httpStoreService: HttpStoreService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.httpStoreService.getStoreList().subscribe((resp) => {
      this.storeList = this.storeService.getMappedStoreList(resp);
    });
  }
}
