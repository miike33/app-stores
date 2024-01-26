import { Injectable } from "@angular/core";
import { PREFIX_DOMAIN } from "../constants/http-constants";
import { IGame, IStore, IStoreGame } from "../models/store.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StoreService {
  constructor() {}

  getMappedStoreList(response: any): IStore[] {
    const mappedStore: IStore[] = response?.results?.map((resp) => {
      return this.getMappedStore(resp);
    });
    return mappedStore;
  }

  getMappedStore(result: any): IStore {
    return {
      id: result.id,
      name: result.name,
      domain: `${PREFIX_DOMAIN}${result.domain}`,
      games_count: result.games_count,
      image_background: result.image_background,
      description: result.description,
      games: this.getMappedStoreGames(result.games),
    };
  }

  getMappedStoreGames(games: IStoreGame[]): IStoreGame[] {
    return games?.map((game: any) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
  }

  getMappedGame(game: any): IGame {
    let mappedGame: IGame = {
      id: game.id,
      name: game.name,
      description: game.description,
      images: this.getGameImages(game),
      released: game.released,
      rating: game.rating,
    };

    return mappedGame;
  }

  getGameImages(game: any): string[] {
    let images: string[] = [game.background_image];

    if (game.background_image_additional) {
      images.push(game.background_image_additional);
    }

    return images;
  }
}
