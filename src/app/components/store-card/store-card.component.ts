import { Component, Input, OnInit } from "@angular/core";
import { IStore } from "src/app/models/store.model";
import { StoreCardLiterals } from "../constants/components.constants";

@Component({
  selector: "store-card",
  templateUrl: "store-card.component.html",
})
export class StoreCardComponent implements OnInit {
  @Input() store!: IStore;

  public literals = StoreCardLiterals;

  constructor() {}

  ngOnInit() {}
}
