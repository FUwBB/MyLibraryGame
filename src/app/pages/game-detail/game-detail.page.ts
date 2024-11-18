import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AutheticationService } from 'src/app/services/authetication.service';  
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {
  userName: string | null = 'Login';
  gameId: number = 0;
  gameDetails: any = {};
  isFavorite: boolean = false; // Controle de favorito

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private authService: AutheticationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameId = +id;
    }
    this.fetchGameDetails();
    this.checkIfFavorite();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName || '';
      } else {
        this.userName = 'Login';
      }
    });
  }

  fetchGameDetails() {
    this.gameService.getGameDetails(this.gameId).subscribe(data => {
      this.gameDetails = data;
    });
  }
  async toggleFavorite() {
    const user = this.auth.currentUser;
    if (user) {
      const userFavoritesDoc = doc(this.firestore, `users/${user.uid}/favorites/${this.gameId}`);
      if (this.isFavorite) {
        // Remove dos favoritos
        await deleteDoc(userFavoritesDoc);
        this.isFavorite = false;
      } else {
        // Adiciona aos favoritos
        const gameData = {
          id: this.gameId,
          name: this.gameDetails.name,
          image: this.gameDetails.image || this.gameDetails.background_image, // Certifique-se de que a imagem esteja definida corretamente
          dateFavorited: new Date().toISOString(),
        };
        await setDoc(userFavoritesDoc, gameData);
        this.isFavorite = true;
      }
    } else {
      console.error('Usuário não autenticado');
    }
  }

  async checkIfFavorite() {
    const user = this.auth.currentUser;
    if (user) {
      const userFavoritesDoc = doc(this.firestore, `users/${user.uid}/favorites/${this.gameId}`);
      const docSnapshot = await getDoc(userFavoritesDoc);
      this.isFavorite = docSnapshot.exists();
    }
  }

  logout() {
    this.authService.singOut().then(() => {
      this.userName = 'Login';
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Erro ao deslogar', error);
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  PagAnterior() {
    this.location.back();
  }
}
