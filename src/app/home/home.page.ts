  import { Component, OnInit } from '@angular/core';
  import { GameService } from '../services/game.service';  
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
  })
  export class HomePage implements OnInit {

    games: any[] = [];

    constructor(private gameService: GameService, private router: Router) {}

    ngOnInit() {
      this.loadGames();
    }

    loadGames() {
      this.gameService.getGames().subscribe(
        (data) => {
          this.games = data.results;  // Armazena os resultados dos jogos
        },
        (error) => {
          console.error('Erro ao buscar jogos', error);
        }
      );
    }

    openGameDetails(gameId: number) {
      this.router.navigate(['/game-detail', gameId]);  // Navega para a página de detalhes do jogo
    }
  }
