import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private firestore: Firestore) {}

  // Adiciona um jogo aos favoritos
  async addGameToFavorites(userId: string, gameId: number, gameData: any) {
    const userFavoritesDoc = doc(this.firestore, `users/${userId}/favorites/${gameId}`);
    await setDoc(userFavoritesDoc, gameData);
  }

  // Remove um jogo dos favoritos
  async removeGameFromFavorites(userId: string, gameId: number) {
    const userFavoritesDoc = doc(this.firestore, `users/${userId}/favorites/${gameId}`);
    await deleteDoc(userFavoritesDoc);
  }
}
