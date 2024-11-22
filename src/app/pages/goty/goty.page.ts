import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { AutheticationService } from 'src/app/services/authetication.service';  

@Component({
  selector: 'app-goty',
  templateUrl: './goty.page.html',
  styleUrls: ['./goty.page.scss'],
})
export class GOTYPage implements OnInit {
  userName: string | null = 'Login';  // Inicializa com 'Login'
  games: any[] = [];  // Lista de jogos

  constructor(
    private gameService: GameService,
    private router: Router,
    private auth: Auth,
    private authService: AutheticationService  
  ) {}

  ngOnInit() {
    this.loadGames();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName || '';  
      } else {
        this.userName = 'Login'; 
      }
    });
  }

  loadGames() {
    this.gameService.getGames().subscribe(
      (data) => {
        this.games = data.results;  // Armazena os jogos retornados pela API
      },
      (error) => {
        console.error('Erro ao carregar jogos', error);
      }
    );
  }

  // Função para redirecionar para os detalhes do jogo
  openGameDetails(gameId: number) {
    this.router.navigate(['/game-detail', gameId]);
  }

  // Função de logout
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
}
