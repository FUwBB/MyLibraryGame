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

    54751:'SoulCalibur é um jogo de luta em 3D que apresenta guerreiros em busca da espada lendária, Soul Edge. Cada personagem tem uma motivação única, desde vingança até redenção, enquanto enfrentam batalhas emocionantes. O jogo inovou com seu sistema de combate fluido e cenários em movimento, tornando-se um clássico no gênero de luta.',

    4459:'GTA IV segue Niko Bellic, um imigrante do leste europeu que chega a Liberty City em busca de um novo começo e de um sonho prometido por seu primo Roman. No entanto, Niko logo se vê envolvido em uma teia de crimes, traições e intrigas enquanto navega pelo submundo da cidade em busca de vingança e respostas sobre seu passado. A história aborda temas profundos como o custo da ambição, a desilusão com o sonho americano e a busca por redenção, destacando uma narrativa madura e personagens tridimensionais em um cenário urbano vasto e detalhado.',

    13537:'Half-Life 2 continua a história de Gordon Freeman, um cientista que se vê como a última esperança da humanidade após os eventos catastróficos em Black Mesa. Agora, sob a opressão do Combine, uma aliança alienígena que tomou o controle da Terra, Gordon lidera uma revolução para libertar a humanidade. A cidade de City 17, com sua arquitetura imponente e atmosfera opressora, é palco de confrontos épicos entre os rebeldes e as forças do Combine. Ao lado de Alyx Vance, uma aliada astuta e corajosa, Gordon enfrenta não apenas soldados e criaturas horríveis, mas também revela segredos sombrios sobre o controle alienígena. ',

    4286:'BioShock é uma obra-prima do gênero de tiro em primeira pessoa que se passa em Rapture, uma utopia submersa criada pelo idealista Andrew Ryan. Inicialmente um refúgio para os maiores gênios da humanidade, a cidade mergulhou no caos devido ao abuso da substância conhecida como ADAM, que concede superpoderes ao usuário, mas a um custo devastador. O protagonista, Jack, sobrevive a um acidente de avião e se vê em meio aos horrores de uma sociedade autodestrutiva. Em sua jornada para escapar de Rapture, Jack descobre verdades perturbadoras sobre sua própria existência e enfrenta dilemas éticos que afetam o desenrolar da história. O jogo é famoso por sua ambientação atmosférica, design detalhado e temas filosóficos que questionam livre arbítrio, moralidade e a busca pela perfeição.',

    324997:'Baldurs Gate 3 mergulha os jogadores em uma aventura épica inspirada em Dungeons & Dragons. Capturado por mind flayers e infectado com um parasita que ameaça transformar os personagens em criaturas monstruosas, o protagonista e seus companheiros improváveis se veem em uma corrida contra o tempo para encontrar uma cura. O mundo aberto e as interações dinâmicas com NPCs e eventos influenciam diretamente o desenrolar da narrativa, levando a diferentes finais. A trama é complexa, com reviravoltas políticas, alianças instáveis e uma exploração profunda das motivações pessoais dos personagens.',

    416:'GTA: San Andreas segue a história de Carl "CJ" Johnson, que retorna a Los Santos após cinco anos para lidar com a morte de sua mãe e a decadência de sua gangue. CJ rapidamente se envolve em lutas de poder, corrupção policial e uma guerra de gangues que envolve todo o estado de San Andreas. A narrativa acompanha a evolução de CJ de um criminoso de rua para um líder respeitado, enquanto ele lida com traições, alianças instáveis e desafios emocionais. O jogo é um marco por seu mundo aberto expansivo, permitindo aos jogadores explorarem cidades vibrantes e áreas rurais enquanto realizam missões variadas.',

    326243:'Em Elden Ring, os jogadores exploram o vasto e misterioso reino de Lands Between, um mundo criado em colaboração entre Hidetaka Miyazaki e George R. R. Martin. Após a destruição do Elden Ring, os descendentes da rainha Marika, cada um controlando um fragmento do anel, travam guerras para consolidar seu poder. Como um Tarnished, você é chamado para restaurar o anel e se tornar o próximo Lorde Elden. A história é sombria e envolvente, repleta de lendas antigas, deuses decaídos e seres mitológicos, e a exploração é acompanhada por uma jogabilidade desafiadora que exige estratégia e habilidade.',

    58175:'God of War (2018) é uma reinvenção da aclamada série de ação e aventura que coloca Kratos, o Deus da Guerra, em uma jornada profundamente pessoal e emocional. Tendo deixado para trás seu passado sangrento na Grécia, ele se muda para a região fria e implacável da mitologia nórdica. Kratos vive com seu filho, Atreus, em busca de redenção e um novo propósito de vida. Após a morte de sua esposa, Kratos e Atreus partem para cumprir seu último desejo: levar suas cinzas ao pico mais alto dos nove reinos. Durante essa jornada cheia de perigos, eles enfrentam deuses e criaturas lendárias enquanto constroem uma relação marcada pelo afeto e conflitos. ',

    3990:'Em The Last of Us, o mundo que conhecemos foi destruído por uma pandemia causada por um fungo parasita que transforma humanos em criaturas agressivas e sem controle. Joel, um homem endurecido pela tragédia, sobrevive em um ambiente onde a moralidade e a empatia são raras. Ele é encarregado de escoltar Ellie, uma adolescente com um segredo que pode mudar o futuro da humanidade, através de um cenário pós-apocalíptico infestado de perigos, tanto humanos quanto infectados. A relação entre Joel e Ellie evolui de maneira profunda ao longo da história, explorando o que significa amar e proteger em um mundo desolado e cruel. A narrativa é famosa por seu realismo emocional, apresentando dilemas morais complexos que desafiam as noções de certo e errado, e destacando a capacidade de resiliência em meio à perda e ao desespero.',

    56123:' "Metroid Prime" segue a caçadora de recompensas Samus Aran em uma jornada pelo planeta Tallon IV, enquanto ela explora ambientes alienígenas, coleta power-ups e combate inimigos para desvendar os segredos deixados pelos antigos Chozo. O jogo, que mistura elementos de ação, aventura e tiro em primeira pessoa, apresenta uma narrativa envolvente, centrada na luta de Samus contra os Piratas Espaciais e suas experiências com a misteriosa substância chamada Phazon.A heroína enfrenta criaturas formidáveis e chefes desafiadores enquanto explora um mundo detalhado e interconectado, repleto de quebra-cabeças e desafios ambientais que a levam a aprimorar seu traje e habilidades.',

    5679:'Skyrim transporta os jogadores para a vasta e épica província de Skyrim, no continente de Tamriel, um lugar repleto de montanhas geladas, ruínas antigas e vilarejos pitorescos. O jogador assume o papel do Dragonborn, um herói lendário com a habilidade de absorver as almas dos dragões e usar seus gritos de poder. A trama central envolve uma profecia que fala do retorno do dragão Alduin, o Devorador de Mundos, que ameaça destruir o mundo. Com liberdade total para explorar e interagir com o mundo, os jogadores podem escolher seguir missões secundárias, se unir a guildas, e moldar o destino de seu personagem, seja ele um guerreiro, mago ou ladrão. ',

    52370:'Metal Gear Solid 2: Sons of Liberty, o jogador acompanha as missões do agente especial Raiden, que é enviado para investigar uma instalação de limpeza marítima chamada Big Shell, ocupada por um grupo terrorista conhecido como Sons of Liberty. O enredo é marcado por reviravoltas surpreendentes, temas de controle de informação e a natureza da realidade em um mundo moderno. O mentor de Raiden, Solid Snake, também desempenha um papel fundamental na narrativa, que explora a conspiração global e o controle das forças políticas e militares por uma organização secreta. O jogo é conhecido por seu roteiro complexo e cinematográfico, além de uma jogabilidade furtiva e mecânicas inovadoras para a época.',


    //PIORES VOTADOS

    427543:'Um jogo de plataforma 3D muito legal, muitas aventuras radicais com nosso amigo Miner, agora temos a opção Double Miner e a aventura fica muito mais legal. A versão Directors Cut conta com cenas inéditas e nunca vistas.',

    825734:'Lex Luthor criou uma versão virtual de Metrópolis e consegue interceptar a Lois Lane, Jimmy Olsen e Professor Emil Hamilton dentro dele. Superman entra no portal para o mundo virtual, onde Luthor diz a ele que ele deve voar através de seu labirinto de anéis espalhados pela Metrópole Virtual.',

    17936:'Rambo: The Video Game é um jogo de ação baseado nos filmes clássicos do personagem Rambo, estrelado por Sylvester Stallone. Lançado em 2014, o jogo permite que os jogadores revivam cenas icônicas dos três primeiros filmes da série, mergulhando em intensas sequências de tiroteio e combate em primeira pessoa. A narrativa se concentra nas missões de Rambo, onde ele enfrenta inimigos tanto em florestas quanto em zonas de guerra urbana, utilizando seu arsenal característico, incluindo o famoso arco e flecha.',
    
    2956:'Tony Hawks Pro Skater 5 traz de volta a essência clássica dos jogos de skate da franquia, com uma abordagem moderna Os jogadores podem escolher entre diversos skatistas profissionais, incluindo Tony Hawk, e participar de níveis repletos de desafios, manobras, e truques radicais. O objetivo é completar missões, alcançar altas pontuações, e explorar ambientes detalhados, além de contar com modos multijogador para competir online.',

    27505: 'Sonic e seus amigos — Tails, Knuckles e Amy — enfrentam Lyric, um antigo vilão robótico que planeja conquistar o mundo com um exército de robôs. Os jogadores alternam entre os personagens, cada um com habilidades únicas, para resolver quebra-cabeças e passar por níveis desafiadores na tentativa de impedir o plano de Lyric e salvar o mundo.',

    3991: 'Aliens: Colonial Marines segue uma equipe de Fuzileiros Navais Coloniais dos EUA enviados para investigar a USS Sulaco, uma nave considerada perdida. Situado no universo da franquia Alien, o jogo de tiro em primeira pessoa coloca os jogadores contra os letais Xenomorfos enquanto desvendam os segredos obscuros da Corporação Weyland-Yutani e seus experimentos.',

    55980: 'Batman: Dark Tomorrow é um jogo de ação e aventura que coloca os jogadores na pele do Cavaleiro das Trevas em uma missão para proteger Gotham City de uma conspiração sinistra que ameaça mergulhar a cidade no caos. A história começa com Batman enfrentando um plano complexo envolvendo vilões icônicos, como o Coringa, Senhor Frio e Ra’s al Ghul, enquanto busca descobrir os segredos por trás de uma nova ameaça.',

    35607: 'Postal III acompanha o protagonista, conhecido como The Postal Dude, em uma cidade cheia de situações bizarras e moralmente questionáveis. O jogo, um shooter em terceira pessoa, é marcado por humor negro e missões absurdas, com um conteúdo controverso e satírico.',

    4190: 'Este título da franquia Call of Duty para o PlayStation Vita se passa entre Black Ops e Black Ops II. Oferece uma campanha com missões curtas focadas em espionagem tática e jogabilidade multiplayer intensa, com os mecanismos característicos da série.',

    40931: 'Ravens Cry conta a história de Christopher Raven, um homem cuja vida foi tragicamente transformada após um ataque pirata que resultou na morte de sua família e o deixou mutilado. Em busca de vingança, ele se torna um anti-herói impiedoso e determinado a destruir aqueles que o prejudicaram. O jogo é ambientado nas perigosas águas do Caribe do século XVII, com uma atmosfera que mistura elementos históricos e fictícios. Ravens Cry é notório por sua narrativa sombria e brutal, abordando temas como vingança, traição e sobrevivência.',

    989: 'Fighter Within é um jogo de luta desenvolvido para o Xbox One que se destaca por seu uso do Kinect, onde os jogadores podem controlar os lutadores com movimentos reais. O objetivo do jogo é proporcionar uma experiência autêntica, simulando golpes, socos e chutes que o jogador realiza fisicamente em frente ao sensor. Com uma abordagem voltada para a imersão, Fighter Within permite que amigos enfrentem-se em combates, utilizando gestos naturais para desencadear ataques especiais e combos.',

    24101: 'The Walking Dead: Survival Instinct funciona como um prelúdio da popular série de TV, acompanhando Daryl Dixon e seu irmão Merle nos primeiros dias do apocalipse zumbi. O jogo foca em mecânicas de sobrevivência, coleta de suprimentos e enfrentamento ou fuga de hordas de zumbis, além de decisões que impactam o desenrolar da jogabilidade. ',

    294133:' Dragon Ball Z: Ultimate Battle 22 é um jogo de luta baseado na popular série de anime e mangá "Dragon Ball Z". Lançado originalmente para o PlayStation, o jogo apresenta um elenco de 22 personagens jogáveis, incluindo os principais heróis e vilões da saga, como Goku, Vegeta, Piccolo, e Freeza. Cada personagem vem com seus próprios movimentos especiais e golpes que refletem as habilidades vistas no anime, como os ataques de energia e transformações em Super Saiyajin. A jogabilidade se concentra em batalhas um contra um, onde os jogadores podem realizar combos e ataques poderosos. O jogo busca capturar a essência das lutas intensas da série, com gráficos em estilo 2D e efeitos sonoros que remetem à animação.',

    27903:'Vroom in the Night Sky é um jogo de ação e corrida desenvolvido para o Nintendo Switch, onde os jogadores assumem o papel de uma bruxa que viaja pelo céu em sua vassoura motorizada. O objetivo principal é coletar estrelas mágicas em diferentes níveis, cada um com cenários urbanos e paisagens noturnas. Com uma proposta inicialmente charmosa, o jogo tenta oferecer uma experiência de exploração livre enquanto a personagem realiza acrobacias aéreas. No entanto, "Vroom in the Night Sky" foi amplamente criticado por seus controles desajeitados, gráficos rudimentares e uma jogabilidade monótona que carece de desafios e variedade. ',

    353423:'Bruce Lee: Quest of the Dragon é um jogo de ação beat em up que segue a lenda das artes marciais, Bruce Lee, em uma jornada pessoal para resgatar seu pai, que foi sequestrado por uma organização criminosa. O jogo coloca os jogadores em uma série de lutas intensas, onde podem usar movimentos de kung fu icônicos e golpes especiais que marcaram a carreira de Bruce Lee. Situado em diversos locais exóticos e com um enredo que mistura drama e artes marciais, o jogo tenta capturar a essência das lutas lendárias de Lee. No entanto, o título recebeu críticas por sua jogabilidade desajeitada e mecânicas repetitivas.',

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

    983381:'DOOM: The Dark Ages é uma abordagem medieval da famosa série de ação em primeira pessoa. Situado em um período onde reinos caem sob o domínio infernal, você assume o papel do lendário DOOM Slayer, lutando contra hordas demoníacas em paisagens góticas e castelos sombrios. Equipado com armas medievais adaptadas, como uma serra-escudo e um mangual destruidor, o Slayer enfrenta inimigos antigos e novos em batalhas intensas e brutais. O enredo explora as origens do guerreiro e sua ascensão como protetor da humanidade em uma era sombria marcada pelo caos e pela magia negra.',

    962020:'Star Wars Outlaws é um jogo de mundo aberto que se passa entre os eventos de Star Wars: O Império Contra-Ataca e O Retorno de Jedi. A trama gira em torno de Kay Vess, uma jovem ladra corajosa que busca escapar do controle dos sindicatos criminosos que governam as bordas da galáxia. Kay, acompanhada por seu fiel companheiro alienígena Nix, se envolve em missões ousadas e enfrenta decisões arriscadas enquanto tenta realizar o maior assalto da sua vida para ganhar liberdade. O jogo destaca a exploração de planetas variados, combates intensos e a capacidade de pilotar e personalizar sua nave, trazendo a essência da rebeldia e das batalhas clássicas do universo de Star Wars.',

    974379:'Dragon Ball Sparking Zero é a nova adição à série Sparking! (conhecida como Budokai Tenkaichi fora do Japão), marcando o retorno do popular estilo de luta 3D da franquia. O jogo promete uma vasta seleção de personagens de todas as eras de Dragon Ball, incluindo Dragon Ball, Dragon Ball Z, Dragon Ball Super e até filmes derivados. Com gráficos modernizados e uma jogabilidade mais fluida, os jogadores podem esperar combates em arenas abertas, onde é possível voar e utilizar ataques especiais icônicos como o Kamehameha, o Final Flash e a Genki Dama. O modo história promete trazer momentos clássicos reimaginados com detalhes cinematográficos e permitir aos jogadores reviver batalhas épicas contra vilões como Freeza, Cell e Majin Buu, além de novas adições da era contemporânea.',

    891238:'Hades II é a sequência do aclamado roguelike Hades da Supergiant Games. Desta vez, a protagonista é Melinoë, irmã de Zagreus e princesa do submundo, que parte em uma missão para derrotar Cronos, o Titã do Tempo, que escapou de sua prisão e ameaça subverter a ordem dos deuses. O jogo mantém a mecânica de combate intensa e viciante de seu predecessor, com melhorias em habilidades, armas e a exploração de novos domínios do submundo. A narrativa se aprofunda na mitologia grega, explorando o papel de Melinoë como deusa dos fantasmas e sua conexão com Hades e Perséfone. Os jogadores encontrarão aliados divinos e mortais, cada um oferecendo poderes e bênçãos que modificam a jogabilidade de maneira única.'
  };

  private manualRatings: { [id: number]: number } = {
    //MELHORES JOGOS
    28: 97,
    3498: 97,
    25097: 99,
    54751: 98,
    4459: 98,
    13537: 96,
    4286: 96,
    324997: 96,
    416: 95,
    326243: 96,
    58175: 94,
    3990: 95,
    56123: 97,
    5679: 96,
    52370:96,

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
    294133: 25,
    27903: 17,
    353423: 32,

    //LANÇAMENTOS
    987537: 81,
    982817: 94,
    850705: 90,
    799266: 75,
    989580: 83,
    963212: 94,
    962025: 89,
    804753: 86,
    962020: 75,
    974379: 81,
    891238: 82

  };

  private manualReleaseDates: { [id: number]: string } = {
    //MELHORES JOGOS
    28: '26 out 2018', 
    3498: '17 set 2013', 
    25097: '21 nov 1998', 
    54751:'8 set 1999',
    4459:'29 abr 2008',
    13537:'16 nov 2004',
    4286:'21 ago 2007',
    324997:'3 ago 2023',
    416:'26 out 2004',
    326243:'25 fev 2022',
    58175:'20 abr 2018',
    3990:'14 jun 2013',
    56123:'17 nov 2002',
    5679:'11 nov 2011',
    52370:'12 nov 2001',

    //PIORES NOTAS
    17936:'21 fev 2014',
    825734:'22 jun 2000',
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
    294133:'25 mar 2003',
    27903:'5 abr 2017',
    353423:'1 jul 2002',

    //LANÇAMENTOS
    850705:'26 jan 2024',
    982817:'6 set 2024',
    987537:'20 ago 2024',
    799266:'4 jul 2024',
    989580:'25 set 2024',
    963212:'11 out 2024',
    972995:'? ? 2025',
    962025:'25 jan 2024',
    891532:'? ? 2025',
    804753:'21 mar 2024',
    490430:'? ? ?',
    983381:'? ? 2025',
    962020:'27 ago 2024',
    974379:'11 out 2024',
    891238:'6 mai 2024'


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