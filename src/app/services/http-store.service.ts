import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  FIRST_GAME_URL,
  FIRST_STORE_DETAILS_URL,
  SECOND_GAME_URL,
  SECOND_STORE_DETAILS_URL,
  STORE_LIST_URL,
} from "../constants/http-constants";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpStoreService {
  constructor(private http: HttpClient) {}

  getStoreList(): Observable<any> {
    return this.http.get<any>(STORE_LIST_URL);
  }

  getStoreById(id: number): Observable<any> {
    return this.http.get<any>(
      `${FIRST_STORE_DETAILS_URL}${id}${SECOND_STORE_DETAILS_URL}`
    );
  }

  getGameById(id: number): Observable<any> {
    if (!id) throw Error("Game not found");

    return this.http.get<any>(`${FIRST_GAME_URL}${id}${SECOND_GAME_URL}`);
  }
}
