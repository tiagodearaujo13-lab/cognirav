import type { QuestionInternal } from '../types.js';

export const questionsDatabase: QuestionInternal[] = [
  // ============================================================
  // MÓDULO 1 — NUMÉRICO & ALGORITMOS (IDs 1–8)
  // ============================================================
  {
    id: 1,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 4, 9, 20, 43, 90, ...?',
    options: [
      { id: 'a', text: '180' },
      { id: 'b', text: '185' },
      { id: 'c', text: '186' },
      { id: 'd', text: '192' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 2,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 3, 8, 6, 13, 12, 18, 24, ...?',
    options: [
      { id: 'a', text: '23' },
      { id: 'b', text: '28' },
      { id: 'c', text: '36' },
      { id: 'd', text: '48' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 3,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 2, 6, 14, 30, 62, ...?',
    options: [
      { id: 'a', text: '124' },
      { id: 'b', text: '126' },
      { id: 'c', text: '128' },
      { id: 'd', text: '130' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 4,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 0, 7, 26, 63, 124, ...?',
    options: [
      { id: 'a', text: '195' },
      { id: 'b', text: '215' },
      { id: 'c', text: '216' },
      { id: 'd', text: '243' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 5,
    category: 'numeric',
    statement:
      'Numa matriz 3×3, observe o padrão: Linha 1: [3, 5, 16] | Linha 2: [4, 7, 22] | Linha 3: [6, 8, ?]. Qual é o valor que completa a matriz?',
    options: [
      { id: 'a', text: '26' },
      { id: 'b', text: '28' },
      { id: 'c', text: '30' },
      { id: 'd', text: '32' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 6,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 120, 60, 40, 30, 24, ...?',
    options: [
      { id: 'a', text: '16' },
      { id: 'b', text: '18' },
      { id: 'c', text: '20' },
      { id: 'd', text: '22' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 7,
    category: 'numeric',
    statement:
      'Qual é o próximo número na sequência: 3, 5, 9, 17, 33, 65, ...?',
    options: [
      { id: 'a', text: '128' },
      { id: 'b', text: '129' },
      { id: 'c', text: '130' },
      { id: 'd', text: '133' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 8,
    category: 'numeric',
    statement:
      '5 está para 120 assim como 4 está para...?',
    options: [
      { id: 'a', text: '24' },
      { id: 'b', text: '48' },
      { id: 'c', text: '64' },
      { id: 'd', text: '96' },
    ],
    correctAnswer: 'a',
  },

  // ============================================================
  // MÓDULO 2 — LÓGICA DEDUTIVA & SILOGISMOS (IDs 9–16)
  // ============================================================
  {
    id: 9,
    category: 'logic',
    statement:
      'Considere as premissas: "Todos os Zorgs são Plims. Nenhum Plim é Kroon. Alguns Vectas são Zorgs." O que se pode concluir com certeza?',
    options: [
      { id: 'a', text: 'Todos os Vectas são Plims.' },
      { id: 'b', text: 'Alguns Vectas não são Kroons.' },
      { id: 'c', text: 'Nenhum Vecta é Kroon.' },
      { id: 'd', text: 'Alguns Plims são Vectas.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 10,
    category: 'logic',
    statement:
      'Numa corrida: A chegou antes de B, mas atrás de C. D chegou antes de C. E chegou entre A e B. Quem ficou em 3.º lugar?',
    options: [
      { id: 'a', text: 'B' },
      { id: 'b', text: 'E' },
      { id: 'c', text: 'A' },
      { id: 'd', text: 'C' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 11,
    category: 'logic',
    statement:
      'Suponha que a afirmação "Nenhum filósofo é desonesto" é falsa. O que é necessariamente verdadeiro?',
    options: [
      { id: 'a', text: 'Todos os filósofos são desonestos.' },
      { id: 'b', text: 'Pelo menos um filósofo é desonesto.' },
      { id: 'c', text: 'A maioria dos filósofos é desonesta.' },
      { id: 'd', text: 'Nenhum desonesto é filósofo.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 12,
    category: 'logic',
    statement:
      'Considere: "Se Alpha ocorrer, então Beta ocorre. Se Beta ocorrer, então Gama não ocorre." Sabe-se que Gama ocorreu. O que se pode concluir?',
    options: [
      { id: 'a', text: 'Alpha ocorreu.' },
      { id: 'b', text: 'Nem Alpha nem Beta ocorreram.' },
      { id: 'c', text: 'Beta ocorreu, mas Alpha não.' },
      { id: 'd', text: 'Nada pode ser concluído.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 13,
    category: 'logic',
    statement:
      'Numa ilha de Verazes e Mentirosos, X diz: "Pelo menos um de nós é mentiroso." O que se pode concluir sobre X e Y?',
    options: [
      { id: 'a', text: 'X é mentiroso e Y é veraz.' },
      { id: 'b', text: 'X é veraz e Y é mentiroso.' },
      { id: 'c', text: 'Ambos são verazes.' },
      { id: 'd', text: 'Ambos são mentirosos.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 14,
    category: 'logic',
    statement:
      'Dado que "P implica (Q ou R)" é verdadeiro, P é verdadeiro e Q é falso. O que se pode concluir?',
    options: [
      { id: 'a', text: 'R é verdadeiro.' },
      { id: 'b', text: 'R é falso.' },
      { id: 'c', text: 'Q é verdadeiro.' },
      { id: 'd', text: 'Nada pode ser concluído sobre R.' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 15,
    category: 'logic',
    statement:
      'Premissas: "Alguns cientistas são músicos. Músicos apreciam arte. Quem aprecia arte é observador." O que se pode concluir?',
    options: [
      { id: 'a', text: 'Todos os cientistas são observadores.' },
      { id: 'b', text: 'Alguns cientistas são observadores.' },
      { id: 'c', text: 'Nenhum cientista é observador.' },
      { id: 'd', text: 'Todos os observadores são cientistas.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 16,
    category: 'logic',
    statement:
      'Dado: "Se chove, a erva cresce. Se a erva cresce, o preço da erva cai." Os preços NÃO caíram. O que se pode concluir?',
    options: [
      { id: 'a', text: 'Choveu, mas a erva não cresceu.' },
      { id: 'b', text: 'Não choveu.' },
      { id: 'c', text: 'A erva cresceu, mas os preços não caíram.' },
      { id: 'd', text: 'Não é possível concluir nada.' },
    ],
    correctAnswer: 'b',
  },

  // ============================================================
  // MÓDULO 3 — RACIOCÍNIO ESPACIAL & GEOMETRIA (IDs 17–24)
  // ============================================================
  {
    id: 17,
    category: 'spatial',
    statement:
      'Um cubo em cruz tem faces numeradas: 1 e 3 horizontais opostas no tronco; 5 no topo de 2 e 6 na base de 2. Qual face é oposta à face 1?',
    options: [
      { id: 'a', text: 'Face 4' },
      { id: 'b', text: 'Face 3' },
      { id: 'c', text: 'Face 2' },
      { id: 'd', text: 'Face 6' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 18,
    category: 'spatial',
    statement:
      'Um cubo 3×3×3 é completamente pintado de azul por fora e depois cortado em 27 cubos menores 1×1×1. Quantos dos cubos menores têm exatamente 2 faces pintadas?',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '6' },
      { id: 'c', text: '12' },
      { id: 'd', text: '24' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 19,
    category: 'spatial',
    statement:
      'Partindo da origem (0,0): anda 4 km para Norte, 3 km para Leste, 8 km para Sul, 6 km para Oeste. Qual é a distância em linha reta até ao ponto final?',
    options: [
      { id: 'a', text: '5 km' },
      { id: 'b', text: '6 km' },
      { id: 'c', text: '7 km' },
      { id: 'd', text: '10 km' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 20,
    category: 'spatial',
    statement:
      'Um ponteiro aponta para o Noroeste (315°). Roda 225° no sentido horário. Para que direção aponta agora?',
    options: [
      { id: 'a', text: 'Norte' },
      { id: 'b', text: 'Leste' },
      { id: 'c', text: 'Sul' },
      { id: 'd', text: 'Oeste' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 21,
    category: 'spatial',
    statement:
      'Um quadrado de papel é dobrado em 4 partes iguais. Corta-se o vértice interno (onde os 4 cantos se encontram). Ao desdobrar o papel, quantos furos centrais há?',
    options: [
      { id: 'a', text: '1 furo' },
      { id: 'b', text: '2 furos' },
      { id: 'c', text: '4 furos' },
      { id: 'd', text: '8 furos' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 22,
    category: 'spatial',
    statement:
      'Um triângulo equilátero é dividido por uma linha vertical e uma linha horizontal internas, criando secções simétricas. Quantos triângulos existem no total na figura resultante (incluindo compostos)?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '5' },
      { id: 'c', text: '6' },
      { id: 'd', text: '8' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 23,
    category: 'spatial',
    statement:
      'A letra "F" é rodada 90° no sentido horário e depois refletida no eixo vertical. Qual é o resultado final?',
    options: [
      { id: 'a', text: '"F" rodado 90° anti-horário.' },
      { id: 'b', text: '"F" espelhado horizontalmente e rodado 90° anti-horário.' },
      { id: 'c', text: '"F" rodado 180°.' },
      { id: 'd', text: '"F" espelhado verticalmente.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 24,
    category: 'spatial',
    statement:
      'Uma caixa aberta tem dimensões externas de 10×10×10 cm. As paredes e o fundo têm 1 cm de espessura. Qual é o volume útil interno em cm³?',
    options: [
      { id: 'a', text: '512 cm³' },
      { id: 'b', text: '576 cm³' },
      { id: 'c', text: '648 cm³' },
      { id: 'd', text: '729 cm³' },
    ],
    correctAnswer: 'b',
  },

  // ============================================================
  // MÓDULO 4 — RELAÇÕES ESTRUTURAIS & ABSTRAÇÃO (IDs 25–30)
  // ============================================================
  {
    id: 25,
    category: 'structural',
    statement:
      'ENTROPIA está para ORDEM assim como ATRITO está para...?',
    options: [
      { id: 'a', text: 'CALOR' },
      { id: 'b', text: 'MOVIMENTO' },
      { id: 'c', text: 'REPOUSO' },
      { id: 'd', text: 'ENERGIA' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 26,
    category: 'structural',
    statement:
      'QUADRADO está para CUBO assim como CÍRCULO está para...?',
    options: [
      { id: 'a', text: 'CONE' },
      { id: 'b', text: 'ESFERA' },
      { id: 'c', text: 'CILINDRO' },
      { id: 'd', text: 'PIRÂMIDE' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 27,
    category: 'structural',
    statement:
      'Num sistema de equivalências: 2 Círculos equivalem a 3 Triângulos. 1 Triângulo equivale a 4 Quadrados. Quantos Quadrados equivalem a 1 Círculo?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '6' },
      { id: 'c', text: '8' },
      { id: 'd', text: '12' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 28,
    category: 'structural',
    statement:
      'Numa língua desconhecida: "KAP LOR" significa "água fria", "LOR MUX" significa "vento frio" e "KAP VEX" significa "água limpa". Qual palavra significa "vento"?',
    options: [
      { id: 'a', text: 'KAP' },
      { id: 'b', text: 'LOR' },
      { id: 'c', text: 'MUX' },
      { id: 'd', text: 'VEX' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 29,
    category: 'structural',
    statement:
      'Dado: "Todo X é Y. Nenhum Z é Y. Alguns W são X e também Z." O que se pode deduzir?',
    options: [
      { id: 'a', text: 'Alguns W são Y e Z simultaneamente.' },
      { id: 'b', text: 'A existência de W sob essas condições é logicamente impossível.' },
      { id: 'c', text: 'Alguns Z são X.' },
      { id: 'd', text: 'Todos os W são Y.' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 30,
    category: 'structural',
    statement:
      'GENE está para GENOMA assim como...?',
    options: [
      { id: 'a', text: 'Célula : Organismo' },
      { id: 'b', text: 'Letra : Alfabeto' },
      { id: 'c', text: 'Átomo : Molécula' },
      { id: 'd', text: 'Página : Livro' },
    ],
    correctAnswer: 'b',
  },
];
