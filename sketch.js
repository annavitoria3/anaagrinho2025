let floresta = [];
let lixos = [];
let pontos = 0;
let temperaturaLixo = 0;
let maxLixo = 20; // Número máximo de lixos na tela
let taxaNovoLixo = 0.02; // Probabilidade de um novo lixo aparecer a cada frame
let tamanhoCelula = 30; // Tamanho de cada célula da grade
let cols;
let rows;
let emojisPlantas = ['🌳', '🌸', '🌷', '🌻', '🌿', '🍀'];
let emojisLixo = ['🗑️', '🍎', '🍌', '🥤', '🍫', '🍬'];

function setup() {
  createCanvas(600, 400);
  cols = floor(width / tamanhoCelula);
  rows = floor(height / tamanhoCelula);
  inicializarFloresta(); // Chama a função para criar a floresta
  adicionarLixoInicial(5); // Adiciona alguns lixos no início do jogo
}

function inicializarFloresta() {
  for (let i = 0; i < cols; i++) {
    floresta[i] = [];
    for (let j = 0; j < rows; j++) {
      floresta[i][j] = random(emojisPlantas);
    }
  }
}

function adicionarLixoInicial(numLixos) {
  for (let i = 0; i < numLixos; i++) {
    adicionarNovoLixo();
  }
}

function adicionarNovoLixo() {
  if (lixos.length < maxLixo) {
    let col = floor(random(cols));
    let row = floor(random(rows));
    // Atribui um emoji aleatório ao lixo no momento da criação
    lixos.push({ x: col, y: row, emoji: random(emojisLixo) });
  }
}

function draw() {
  background(101, 67, 33); // Cor de terra para o fundo

  // Desenha a floresta
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      textSize(tamanhoCelula * 0.8);
      textAlign(CENTER, CENTER);
      text(floresta[i][j], i * tamanhoCelula + tamanhoCelula / 2, j * tamanhoCelula + tamanhoCelula / 2);
    }
  }

  // Desenha os lixos
  for (let i = 0; i < lixos.length; i++) {
    textSize(tamanhoCelula * 0.8);
    textAlign(CENTER, CENTER);
    // Usa o emoji que foi atribuído ao lixo
    text(lixos[i].emoji, lixos[i].x * tamanhoCelula + tamanhoCelula / 2, lixos[i].y * tamanhoCelula + tamanhoCelula / 2);
  }

  // Verifica se um novo lixo deve aparecer
  if (random(1) < taxaNovoLixo) {
    adicionarNovoLixo();
  }

  // Atualiza a temperatura do lixo (nível de poluição)
  temperaturaLixo = lixos.length / maxLixo;

  // Mostra a pontuação e o nível de poluição
  textSize(20);
  fill(255);
  text(`Pontos: ${pontos}`, 20, 30);
  text(`Poluição: ${floor(temperaturaLixo * 100)}%`, 20, 55);

  // Verifica se o jogador perdeu
  if (temperaturaLixo >= 1) {
    gameOver();
  }
}

function mousePressed() {
  let col = floor(mouseX / tamanhoCelula);
  let row = floor(mouseY / tamanhoCelula);

  // Verifica se o clique acertou um lixo
  for (let i = lixos.length - 1; i >= 0; i--) {
    if (lixos[i].x === col && lixos[i].y === row) {
      lixos.splice(i, 1); // Remove o lixo clicado
      pontos++; // Aumenta a pontuação
      break; // Sai do loop após remover um lixo por clique
    }
  }
}

function gameOver() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Game Over!", width / 2, height / 2);
  noLoop(); // Para o loop 'draw', congelando o jogo
}