let tela = "intro";
let xJogador = [0, 0, 0, 0];
let yJogador = [75, 200, 350, 500]; 
let jogador = ["🚛", "🚜", "👨‍🌾", "👩‍🌾"]
let teclas = ["a", "s", "l", "k"];
let posObstaculos = [];
let obstaculoSize = 20;
let larguraLinhaChegada = 700;

let fundoImg; 

function preload() {
  fundoImg = loadImage("istockphoto-1161948652-612x612.jpg"); // adiciona uma imagem de fundo
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    posObstaculos.push(createVector(random(50, larguraLinhaChegada - 50), random(0, height)));
  }
}

function draw() {
  if (tela === "intro") {
    mostrarIntroducao();
  } else if (tela === "jogo") {
    jogar();
  }
}

function mostrarIntroducao() {
  background('green');
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("🌳Bem vindos ao jogo de corrida de obstaculos!🌳", width / 2, height / 2 - 240);
  
  fill(255);
  textSize(26);
  text("Siga essas instruções para jogar!", width / 2, height / 2 - 200);
  fill(255);
  textSize(25);
  text('1 - para que o jogador 🚛 corra clique na letra A', width / 2, height / 2 - 150)
  fill(255);
  textSize(25);
  text('2 - para que o jogador 🚜 corra clique na letra S', width / 2, height / 2 - 100)
  fill(255);
  textSize(25);
  text('3 - para que o jogador 👨‍🌾 corra clique na letra L', width / 2, height / 2 - 50)
  fill(255);
  textSize(25);
  text('4 - para que o jogador 👩‍🌾 corra clique na letra K', width / 2, height / 2 - 0)
  fill("red");
  textSize(24);
  text("ATENÇÃO DESVIE DOS OBSTACULOS DA PISTA" , width / 2, height / 2 + 50 )
  fill("white");
  textSize(26);
  text("caso não conseguir passar devido os obstaculos, tente com outro jogador!" , width / 2, height / 2 + 100 )
  fill("white");
  textSize(26);
  text("BOA SORTE!" , width / 2, height / 2 + 150)
  fill(255);
  textSize(20);
  text("Pressione na tela e na tecla ESPAÇO para iniciar o jogo!", width / 2, height / 2 + 200);
}

function keyPressed() {
  if (tela === "intro" && key === " ") {
    tela = "jogo"; 
  }
  if (tela === "jogo") {
    if (key === "a") {
      xJogador[0] += 5;
    }
    if (key === "s") {
      xJogador[1] += 5;
    }
    if (key === "l") {
      xJogador[2] += 5;
    }
    if (key === "k") {
      xJogador[3] += 5;
    }
  }
}

function jogar() {
  ativaJogo();
  desenhaJogadores();
  desenhaObstaculos();
  desenhaLinhaDeChegada();
  verificaVencedor();
}

function ativaJogo() {
  image(fundoImg, 0, 0, width, height); // imagem de fundo
}

function desenhaJogadores() {
  textSize(40);
  for (let i = 0; i < 4; i++) {
    text(jogador[i], xJogador[i], yJogador[i]);
  }
}

function desenhaObstaculos() {
  fill("green");
  for (let i = 0; i < posObstaculos.length; i++) {
    textSize(30);
    text("🥬", posObstaculos[i].x, posObstaculos[i].y); // Obstáculo 
  }
}

function desenhaLinhaDeChegada() {
  for (let i = 0; i < height; i += 20) {
    if (i % 40 === 0) {
      fill("black");
    } else {
      fill("white");
    }
    rect(larguraLinhaChegada, i, 10, 20);
  }
}

function verificaVencedor() {
  for (let i = 0; i < 4; i++) {
    if (xJogador[i] >= larguraLinhaChegada) {
      textSize(32);
      fill(255);
      text(jogador[i] + " venceu!", width / 2, height / 2);
      noLoop();
    }
  }
  verificaColisao();
}

function verificaColisao() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < posObstaculos.length; j++) {
      let distJogador = dist(xJogador[i], yJogador[i], posObstaculos[j].x, posObstaculos[j].y);
      if (distJogador < obstaculoSize / 2) {
        textSize(32);
        fill(255, 0, 0);
        text(jogador[i] + " bateu no obstáculo! GAME OVER", width / 2, height / 2);
        noLoop();
      }
    }
  }
}
