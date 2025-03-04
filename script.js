const perguntas = [
  {
    pergunta: "Qual a capital do Brasil?",
    respostas: [
      { texto: "Rio de Janeiro", correta: false },
      { texto: "Brasília", correta: true },
      { texto: "São Paulo", correta: false },
      { texto: "Salvador", correta: false }
    ]
  },
  {
    pergunta: "Qual o maior planeta do Sistema Solar?",
    respostas: [
      { texto: "Terra", correta: false },
      { texto: "Júpiter", correta: true },
      { texto: "Marte", correta: false },
      { texto: "Saturno", correta: false }
    ]
  },
  // Adicione mais perguntas aqui!
];

let perguntaAtual = 0;
let pontuacao = 0;

const perguntaElemento = document.getElementById("pergunta");
const respostasElemento = document.getElementById("respostas");
const proximoBtn = document.getElementById("proximo-btn");
const resultadoElemento = document.getElementById("resultado");

function carregarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  perguntaElemento.textContent = pergunta.pergunta;

  respostasElemento.innerHTML = "";
  pergunta.respostas.forEach(resposta => {
    const li = document.createElement("li");
    li.textContent = resposta.texto;
    li.addEventListener("click", () => verificarResposta(resposta.correta));
    respostasElemento.appendChild(li);
  });
}

function verificarResposta(correta) {
  if (correta) {
    pontuacao++;
    respostasElemento.querySelector("li:nth-child(" + (perguntas[perguntaAtual].respostas.findIndex(r => r.correta) + 1) + ")").classList.add("correta");
  } else {
    respostasElemento.querySelector("li:nth-child(" + (perguntas[perguntaAtual].respostas.findIndex(r => r.correta) + 1) + ")").classList.add("correta");
    respostasElemento.querySelector("li:nth-child(" + (perguntas[perguntaAtual].respostas.findIndex(r => !r.correta && respostasElemento.querySelectorAll("li")[perguntas[perguntaAtual].respostas.findIndex(r => !r.correta)].textContent == respostasElemento.querySelectorAll("li")[perguntas[perguntaAtual].respostas.findIndex(r => !r.correta)].textContent) + 1) + ")").classList.add("incorreta");
  }
  proximoBtn.style.display = "block";
  respostasElemento.querySelectorAll("li").forEach(li => li.style.pointerEvents = "none");
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
    proximoBtn.style.display = "none";
    respostasElemento.querySelectorAll("li").forEach(li => li.style.pointerEvents = "auto");
  } else {
    exibirResultado();
  }
}

function exibirResultado() {
  perguntaElemento.style.display = "none";
  respostasElemento.style.display = "none";
  proximoBtn.style.display = "none";
  resultadoElemento.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

carregarPergunta();
proximoBtn.addEventListener("click", proximaPergunta);