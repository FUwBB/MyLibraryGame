import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
})
export class GameDetailPage implements OnInit {

  gameId: number = 0;  // Inicialização da variável
  gameDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameId = +id;  // Conversão para número
    }
    this.fetchGameDetails();
  }

  fetchGameDetails() {
    this.gameService.getGameDetails(this.gameId).subscribe(data => {
      this.gameDetails = data;
    });
  }
}
