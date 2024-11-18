import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meuperfil',
  templateUrl: './meuperfil.page.html',
  styleUrls: ['./meuperfil.page.scss'],
})
export class MeuperfilPage implements OnInit {
  userName: string | null = 'Login';
  favoriteGames: any[] = []; // Array para armazenar os jogos favoritos

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('Usuário autenticado:', user.uid); // Verifica se o usuário está logado
        this.userName = user.displayName || '';
        this.loadFavoriteGames(user.uid);
      } else {
        this.userName = 'Login';
        console.log('Usuário não está autenticado');
      }
    });
  }

  async loadFavoriteGames(userId: string) {
    const favoritesCollection = collection(this.firestore, `users/${userId}/favorites`);
    const querySnapshot = await getDocs(favoritesCollection);
    this.favoriteGames = querySnapshot.docs.map(doc => doc.data());
  }

  openGameDetails(gameId: number) {
    this.router.navigate(['/game-detail', gameId]); // Navega para a página de detalhes do jogo
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
