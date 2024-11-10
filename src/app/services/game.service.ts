import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiKey = '6fc1088fc8ec4f82b83af23244d82f8c';  
  private apiUrl = `https://api.rawg.io/api/games?key=${this.apiKey}`; 

  private manualSynopses: { [id: number]: string } = {
    28: 'Estados Unidos, 1899. O fim da era do velho oeste se aproxima, e os xerifes caçam as últimas gangues fora da lei. Quem não se rende ou sucumbe, acaba morto. Depois de tudo dar errado em um roubo na cidade de Blackwater, no faroeste, Arthur Morgan e a gangue Van der Linde são obrigados a fugir. Com agentes federais e os melhores caçadores de recompensas no seu encalço, a gangue terá que roubar, assaltar e lutar para sobreviver no implacável coração dos Estados Unidos. Conforme as divergências internas se acirram e ameaçam separar a gangue, Arthur precisa fazer uma escolha entre seus ideais e sua lealdade com o grupo de fora da lei que o criou.',

    3498: 'Grand Theft Auto V (GTA V) acompanha a vida de três personagens principais: Michael, um ex-assaltante de bancos que vive sob proteção de testemunhas; Franklin, um jovem que tenta superar sua realidade em um bairro problemático; e Trevor, um ex-militar imprevisível e antigo parceiro de Michael. A história se passa no estado fictício de San Andreas e foca nos personagens enquanto eles se envolvem em uma série de assaltos arriscados, traições e confrontos violentos com a polícia, gangues rivais e o submundo do crime.',

    25097: 'Em The Legend of Zelda: Ocarina of Time, os jogadores acompanham a jornada de Link, um jovem herói da terra de Hyrule. Convocado pela Árvore Deku, Link descobre uma antiga profecia e parte em uma missão para impedir o maligno Ganondorf de obter o poder sagrado da Triforce, uma relíquia mística capaz de conceder desejos ao seu portador.',

    427543:'Um jogo de plataforma 3D muito legal, muitas aventuras radicais com nosso amigo Miner, agora temos a opção Double Miner e a aventura fica muito mais legal. A versão Directors Cut conta com cenas inéditas e nunca vistas.',

    825734:'Lex Luthor criou uma versão virtual de Metrópolis e consegue interceptar a Lois Lane, Jimmy Olsen e Professor Emil Hamilton dentro dele. Superman entra no portal para o mundo virtual, onde Luthor diz a ele que ele deve voar através de seu labirinto de anéis espalhados pela Metrópole Virtual.',

    17936:'Rambo: The Video Game é um jogo de ação baseado nos filmes clássicos do personagem Rambo, estrelado por Sylvester Stallone. Lançado em 2014, o jogo permite que os jogadores revivam cenas icônicas dos três primeiros filmes da série, mergulhando em intensas sequências de tiroteio e combate em primeira pessoa. A narrativa se concentra nas missões de Rambo, onde ele enfrenta inimigos tanto em florestas quanto em zonas de guerra urbana, utilizando seu arsenal característico, incluindo o famoso arco e flecha.',

    850705:'Tekken 8 é o próximo título da aclamada série de jogos de luta da Bandai Namco, trazendo novos gráficos, jogabilidade aprimorada e uma narrativa intensa. Seguindo os eventos de Tekken 7, o jogo foca no conflito contínuo dentro da família Mishima, especialmente entre Kazuya Mishima e seu filho, Jin Kazama. Com gráficos impressionantes construídos na Unreal Engine 5, Tekken 8 promete uma experiência visual e de combate ainda mais envolvente, com uma nova mecânica de combate chamada "Heat System," que permite aos jogadores desencadear ataques mais poderosos e estratégicos.',

    982817:'Astro Bot Rescue Mission (2024) é um jogo de plataforma em VR onde o jogador controla Astro, um pequeno robô que precisa resgatar sua tripulação, a Bot Crew, espalhada por diversos mundos. Em cenários repletos de desafios e obstáculos criativos, Astro enfrenta inimigos, resolve quebra-cabeças e explora áreas escondidas para reunir seu time. O jogo utiliza mecânicas avançadas de realidade virtual, proporcionando uma experiência imersiva onde os jogadores realmente sentem que fazem parte do universo do Astro, explorando e interagindo com o ambiente virtual.',

    987537:'Black Myth: Wukong é um RPG de ação inspirado no clássico conto chinês Jornada ao Oeste, que narra a história do Rei Macaco, Sun Wukong, e suas aventuras lendárias. No jogo, você controla Wukong em um mundo rico e deslumbrante, onde enfrenta uma variedade de inimigos, desde criaturas fantásticas a seres mitológicos, utilizando uma combinação de habilidades mágicas, transformações e um combate ágil com o bastão característico do personagem.'
  };

  private manualRatings: { [id: number]: number } = {
    28: 97,
    3498: 97,
    25097: 99,
    17936: 34,
    825734: 26,
    427543: 20,
    850705: 90,
    982817: 94,
    987537: 81,
  };

  private manualReleaseDates: { [id: number]: string } = {
    28: '2018-10-26', 
    3498: '2013-09-17', 
    25097: '1998-11-21', 
    799266: '2000-12-20'
  };

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getGameDetails(gameId: number): Observable<any> {
    return this.http.get(`https://api.rawg.io/api/games/${gameId}?key=${this.apiKey}`).pipe(
      map((game: any) => {
        const rawDate = this.manualReleaseDates[game.id] || game.released;
        game.manualFormattedDate = this.formatDate(rawDate);
        return game;
      })
    );
  }
  
  private formatDate(dateString: string): string {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options).replace(',', '');
  }

}
