export interface IStore {
  id: number;
  name: string;
  domain: string;
  games_count: number;
  image_background: string;
  description: string;
  games: IStoreGame[];
}

export interface IStoreGame {
  id: number;
  name: string;
}

export interface IGame {
  id: number;
  name: string;
  description: string;
  images: string[];
  released: string;
  rating: number;
}
