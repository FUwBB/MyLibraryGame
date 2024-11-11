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
    //MELHORES JOGOS
    28: 'Estados Unidos, 1899. O fim da era do velho oeste se aproxima, e os xerifes caçam as últimas gangues fora da lei. Quem não se rende ou sucumbe, acaba morto. Depois de tudo dar errado em um roubo na cidade de Blackwater, no faroeste, Arthur Morgan e a gangue Van der Linde são obrigados a fugir. Com agentes federais e os melhores caçadores de recompensas no seu encalço, a gangue terá que roubar, assaltar e lutar para sobreviver no implacável coração dos Estados Unidos. Conforme as divergências internas se acirram e ameaçam separar a gangue, Arthur precisa fazer uma escolha entre seus ideais e sua lealdade com o grupo de fora da lei que o criou.',

    3498: 'Grand Theft Auto V (GTA V) acompanha a vida de três personagens principais: Michael, um ex-assaltante de bancos que vive sob proteção de testemunhas; Franklin, um jovem que tenta superar sua realidade em um bairro problemático; e Trevor, um ex-militar imprevisível e antigo parceiro de Michael. A história se passa no estado fictício de San Andreas e foca nos personagens enquanto eles se envolvem em uma série de assaltos arriscados, traições e confrontos violentos com a polícia, gangues rivais e o submundo do crime.',

    25097: 'Em The Legend of Zelda: Ocarina of Time, os jogadores acompanham a jornada de Link, um jovem herói da terra de Hyrule. Convocado pela Árvore Deku, Link descobre uma antiga profecia e parte em uma missão para impedir o maligno Ganondorf de obter o poder sagrado da Triforce, uma relíquia mística capaz de conceder desejos ao seu portador.',

    //PIORES VOTADOS

    427543:'Um jogo de plataforma 3D muito legal, muitas aventuras radicais com nosso amigo Miner, agora temos a opção Double Miner e a aventura fica muito mais legal. A versão Directors Cut conta com cenas inéditas e nunca vistas.',

    825734:'Lex Luthor criou uma versão virtual de Metrópolis e consegue interceptar a Lois Lane, Jimmy Olsen e Professor Emil Hamilton dentro dele. Superman entra no portal para o mundo virtual, onde Luthor diz a ele que ele deve voar através de seu labirinto de anéis espalhados pela Metrópole Virtual.',

    17936:'Rambo: The Video Game é um jogo de ação baseado nos filmes clássicos do personagem Rambo, estrelado por Sylvester Stallone. Lançado em 2014, o jogo permite que os jogadores revivam cenas icônicas dos três primeiros filmes da série, mergulhando em intensas sequências de tiroteio e combate em primeira pessoa. A narrativa se concentra nas missões de Rambo, onde ele enfrenta inimigos tanto em florestas quanto em zonas de guerra urbana, utilizando seu arsenal característico, incluindo o famoso arco e flecha.',
    
    2956:' ',

    27505: ' ',

    3991: ' ',

    55980: ' ',

    35607: ' ',

    4190: ' ',

    40931: ' ',

    989: ' ',

    24101: ' ',

    //LANÇAMENTOS

    850705:'Tekken 8 é o próximo título da aclamada série de jogos de luta da Bandai Namco, trazendo novos gráficos, jogabilidade aprimorada e uma narrativa intensa. Seguindo os eventos de Tekken 7, o jogo foca no conflito contínuo dentro da família Mishima, especialmente entre Kazuya Mishima e seu filho, Jin Kazama. Com gráficos impressionantes construídos na Unreal Engine 5, Tekken 8 promete uma experiência visual e de combate ainda mais envolvente, com uma nova mecânica de combate chamada "Heat System," que permite aos jogadores desencadear ataques mais poderosos e estratégicos.',

    982817:'Astro Bot Rescue Mission (2024) é um jogo de plataforma em VR onde o jogador controla Astro, um pequeno robô que precisa resgatar sua tripulação, a Bot Crew, espalhada por diversos mundos. Em cenários repletos de desafios e obstáculos criativos, Astro enfrenta inimigos, resolve quebra-cabeças e explora áreas escondidas para reunir seu time. O jogo utiliza mecânicas avançadas de realidade virtual, proporcionando uma experiência imersiva onde os jogadores realmente sentem que fazem parte do universo do Astro, explorando e interagindo com o ambiente virtual.',

    987537:'Black Myth: Wukong é um RPG de ação inspirado no clássico conto chinês Jornada ao Oeste, que narra a história do Rei Macaco, Sun Wukong, e suas aventuras lendárias. No jogo, você controla Wukong em um mundo rico e deslumbrante, onde enfrenta uma variedade de inimigos, desde criaturas fantásticas a seres mitológicos, utilizando uma combinação de habilidades mágicas, transformações e um combate ágil com o bastão característico do personagem.',

    989580:'Mouthwashing é um jogo de terror na primeira pessoa que acompanha a tripulação agonizante de um cargueiro espacial naufragado. Quem poderia imaginar do que o velho Capitão Curly era capaz? Ele deve ter pensado que o mais certo era a tripulação morrer com ele. Mas alguns homens nem conseguem matar-se direito. Mutilado, sem membros e incapaz de falar, mas ainda assim vivo, Curly está agora à mercê da tripulação que condenou a uma morte lenta.',

    972995:'O jogo acompanha uma dupla criminosa: Lucia, a primeira protagonista feminina da franquia desde 1999, e seu parceiro; o primeiro trailer mostra Lucia como uma presidiária e, posteriormente, fugindo da custódia com seu parceiro. Grand Theft Auto VI se passa no mundo aberto fictício do estado de Leonida baseado no estado da Flórida, nos Estados Unidos que inclui a cidade de Vice City, uma versão fictícia de Miami. Vice City foi anteriormente apresentada no universo 2D de Grand Theft Auto (1997) e se configurou como cenário principal no universo 3D de Grand Theft Auto: Vice City (2002) e Grand Theft Auto: Vice City Stories (2006).',

    799266:' Zenless Zone Zero é um jogo de ação e aventura desenvolvido pela HoYoverse, a mesma equipe por trás de sucessos como Genshin Impact e Honkai Impact 3rd. A história se passa em uma metrópole pós-apocalíptica chamada New Eridu, a última cidade conhecida que sobreviveu após um cataclismo causado por portais misteriosos chamados de Hollows. Esses portais trouxeram criaturas chamadas Ethereals, que representam uma ameaça mortal. Os jogadores assumem o papel de um Proxy, uma figura responsável por guiar um grupo de personagens carismáticos e únicos em missões para explorar os Hollows, enfrentar inimigos e descobrir segredos ocultos.',

    963212:'Metaphor: ReFantazio é um jogo de RPG de fantasia desenvolvido pelo mesmo estúdio responsável pela série Persona. O título apresenta um mundo completamente novo repleto de magia e perigos. Os jogadores embarcam em uma aventura épica, explorando um ambiente vasto e enfrentando criaturas misteriosas. O jogo promete mecânicas de combate envolventes, estratégias profundas e uma narrativa cativante que lida com temas de coragem e destino em um cenário encantador e visualmente impressionante.',

    962025:'Like a Dragon: Infinite Wealth segue a jornada de Ichiban Kasuga após os eventos de Yakuza: Like a Dragon. Dessa vez, a história o leva ao Havaí, onde ele enfrenta desafios inesperados e novas aventuras. O jogo mistura elementos clássicos de RPG com exploração de mundo aberto, destacando interações complexas com personagens novos e conhecidos. A narrativa é repleta de humor, drama e cenas emocionantes, mantendo o equilíbrio entre a ação e o desenvolvimento dos personagens.',

    891532:'a história segue Sam Bridges em uma nova missão para ajudar a humanidade a sobreviver. Situado após os eventos do primeiro Death Stranding, Sam, agora com novos aliados, busca expandir a Rede Quiral enquanto enfrenta adversários poderosos e sobrenaturais. Fragile, uma personagem central, lidera a base móvel DHV Magellan, que desempenha um papel importante na conexão e suporte às diferentes cidades.',

    804753:'Os jogadores assumem o papel do Arisen, um herói destinado a enfrentar um dragão ancestral que ameaça o mundo. Ambientado em Gransys, um reino vasto e cheio de perigos, o jogo combina elementos de ação e RPG em um mundo aberto. A jornada começa após o protagonista ter seu coração roubado pelo dragão, marcando-o com a responsabilidade de caçar a criatura e enfrentar seu destino. O jogo é conhecido por seu sistema de combate dinâmico, que permite aos jogadores escalar grandes inimigos e utilizar habilidades únicas.',

    490430:'Os jogadores assumem o papel de um jovem Príncipe em uma jornada de redenção e heroísmo. Após libertar, sem querer, as Areias do Tempo, uma poderosa substância que transforma humanos em monstros, ele precisa se aliar à astuta princesa Farah para corrigir o erro. Com habilidades acrobáticas únicas, o Príncipe corre, salta e combate através de um palácio encantado repleto de armadilhas mortais, utilizando o poder das Areias para manipular o tempo, desfazer erros e resolver desafios. Esta versão moderniza os gráficos, a jogabilidade e a narrativa, trazendo uma nova vida ao clássico de 2003.',

    983381:'DOOM: The Dark Ages é uma abordagem medieval da famosa série de ação em primeira pessoa. Situado em um período onde reinos caem sob o domínio infernal, você assume o papel do lendário DOOM Slayer, lutando contra hordas demoníacas em paisagens góticas e castelos sombrios. Equipado com armas medievais adaptadas, como uma serra-escudo e um mangual destruidor, o Slayer enfrenta inimigos antigos e novos em batalhas intensas e brutais. O enredo explora as origens do guerreiro e sua ascensão como protetor da humanidade em uma era sombria marcada pelo caos e pela magia negra.'
  };

  private manualRatings: { [id: number]: number } = {
    //MELHORES JOGOS
    28: 97,
    3498: 97,
    25097: 99,
    
    //PIORES JOGOS
    17936: 34,
    825734: 26,
    427543: 20,
    2956: 32,
    27505: 32,
    3991: 48,
    55980: 29,
    35607: 24,
    4190: 33,
    40931: 27,
    989: 23,
    24101: 32,

    //LANÇAMENTOS
    987537: 81,
    982817: 94,
    850705: 90,
    799266: 75,
    989580: 83,
    963212: 94,
    962025: 89,
    804753: 86,
  };

  private manualReleaseDates: { [id: number]: string } = {
    //MELHORES JOGOS
    28: '26 out 2018', 
    3498: '17 set 2013', 
    25097: '21 nov 1998', 

    //PIORES NOTAS
    17936:'21 fev 2014',
    825734: '22 jun 2000',
    427543:'3 jan 2020',
    2956:'29 set 2015',
    27505:'11 nov 2014',
    3991:'12 fev 2013',
    55980:'18 mar 2003',
    35607:'21 dez 2011',
    4190:'13 nov 2012',
    40931:'30 jan 2015',
    989:'19 nov 2013',
    24101:'19 mar 2013',




    //LANÇAMENTOS
    850705:'26 jan 2024',
    982817:'6 set 2024',
    987537:'20 ago 2024',
    799266: '4 jul 2024',
    989580:'25 set 2024',
    963212:'11 out 2024',
    972995:'? ? 2025',
    962025:'25 jan 2024',
    891532:'? ? 2025',
    804753:'21 mar 2024',
    490430:'? ? ?',
    983381:'? ? 2025'

  };

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getGameDetails(gameId: number): Observable<any> {
    return this.http.get(`https://api.rawg.io/api/games/${gameId}?key=${this.apiKey}`).pipe(
      map((game: any) => {
        game.manualSynopsis = this.manualSynopses[game.id] || '';
        game.manualRating = this.manualRatings[game.id] || null;
        game.manualReleaseDate = this.manualReleaseDates[game.id] || game.released;
        return game;
      })
    );
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('pt-BR', options).replace(',', '');
  }
  
}  