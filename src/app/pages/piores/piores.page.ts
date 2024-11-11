import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-piores',
  templateUrl: './piores.page.html',
  styleUrls: ['./piores.page.scss'],
})
export class PioresPage implements OnInit {

  games: any[] = [];  // Lista de jogos

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGames();  // Carrega os jogos ao iniciar a página
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

  // Navega para a página de detalhes de um jogo específico
  openGameDetails(gameId: number) {
    this.router.navigate(['/game-detail', gameId]);  // Redireciona para a página de detalhes
  }
}