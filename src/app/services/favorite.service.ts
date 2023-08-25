import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favoriteIDs: string[] = [];

  constructor() {}

  addFavorite(id: string) {
    this.favoriteIDs.push(id);
  }

  removeFavorite(id: string) {
    this.favoriteIDs = this.favoriteIDs.filter((fav) => fav !== id);
  }

  isFavorite(id: string) {
    return this.favoriteIDs.includes(id);
  }

  toggleFavorite(id: string) {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }
}
