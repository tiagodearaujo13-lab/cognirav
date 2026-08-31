# Cognirav — Plataforma de Avaliação de QI Fluida

> **Teste psicométrico de inteligência fluida com 30 questões calibradas, motor de cálculo de QI, trava de tentativa única por e-mail e interface web moderna.**

---

## Visão Geral

**Cognirav** é uma plataforma full-stack de avaliação cognitiva que mede o Quociente de Inteligência (QI) fluido através de 30 questões psicométricas distribuídas em 4 módulos:

| Módulo | Questões | Competência Avaliada |
|--------|----------|----------------------|
| Numérico & Algoritmos | 1–8 | Raciocínio quantitativo, sequências, matrizes |
| Lógica Dedutiva | 9–16 | Silogismos, implicações, lógica proposicional |
| Raciocínio Espacial | 17–24 | Geometria, rotações, orientação |
| Abstração Estrutural | 25–30 | Analogias, relações simbólicas, padrões |

---

## Escala Psicométrica

| Acertos | QI Estimado | Classificação | Percentil |
|---------|------------|---------------|-----------|
| 28–30 | 131–145 | Muito Superior (Mensa Level) | >99% |
| 24–27 | 116–130 | Elevado / Superior | 85–97% |
| 18–23 | 101–115 | Média Superior | 51–84% |
| 11–17 | 85–100 | Média Padrão | 16–50% |
| 0–10 | 70–84 | Abaixo da Média | <16% |

---

## Stack Tecnológica

### Back-end (`server/`)
- **Node.js** + **Express** + **TypeScript** (ES2022/NodeNext)
- **Zod** — validação de schemas em runtime
- **Helmet** — segurança de headers HTTP
- **CORS** — configurado estritamente para o frontend
- **express-rate-limit** — proteção contra brute force/DDoS

### Front-end (`web/`)
- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** — design system dark moderno
- **Lucide React** — ícones vetoriais acessíveis (WCAG)
- **Canvas Confetti** — celebração visual para scores elevados
- **clsx** + **tailwind-merge** — composição limpa de classes

---

## Arranque Rápido

### Pré-requisitos
- Node.js 18+
- npm 9+
- Git

### 1. Clonar o repositório
```bash
git clone https://github.com/tiagodearaujo13-lab/cognirav.git
cd cognirav
```

### 2. Iniciar o Back-end
```bash
cd server
npm install
cp .env.example .env   # Ajuste as variáveis conforme necessário
npm run dev
```
O servidor arranca em: **http://localhost:3001**

### 3. Iniciar o Front-end (novo terminal)
```bash
cd web
npm install
npm run dev
```
A aplicação abre em: **http://localhost:5173**

---

## Variáveis de Ambiente

### `server/.env`
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### `web/.env` (opcional)
```env
VITE_API_URL=http://localhost:3001
```

---

## API Endpoints

### `GET /health`
Verifica o estado do servidor.
```json
{ "status": "ok", "timestamp": "2024-01-15T12:00:00.000Z" }
```

### `GET /api/questions`
Retorna as 30 questões públicas (sem `correctAnswer`).

### `POST /api/submit`
Submete as respostas e calcula o resultado.

**Body:**
```json
{
  "email": "utilizador@exemplo.com",
  "answers": [
    { "questionId": 1, "selectedOption": "b" },
    ...
  ]
}
```

**Resposta 201:**
```json
{
  "email": "utilizador@exemplo.com",
  "totalQuestions": 30,
  "correctCount": 24,
  "estimatedIQ": 122,
  "percentile": 91,
  "classification": "Elevado / Superior",
  "categories": [...],
  "completedAt": "2024-01-15T12:05:30.000Z"
}
```

**Resposta 409 (e-mail já utilizado):**
```json
{
  "error": "Este e-mail já realizou o teste Cognirav.",
  "alreadyCompleted": true
}
```

---

## Estrutura do Projeto

```
Cognirav/
├── .gitignore
├── .env.example
├── README.md
├── server/
│   ├── src/
│   │   ├── data/questions.ts        # 30 questões calibradas
│   │   ├── routes/test.routes.ts    # GET /questions + POST /submit
│   │   ├── index.ts                 # Express + middleware
│   │   └── types.ts                 # Interfaces TypeScript
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── web/
    ├── src/
    │   ├── components/ui/           # Button, Card, ProgressBar, Badge
    │   ├── contexts/QuizContext.tsx # Estado global + cronômetro
    │   ├── hooks/useQuiz.ts
    │   ├── pages/                   # LandingPage, QuizPage, ResultPage
    │   ├── services/api.ts
    │   ├── types/index.ts
    │   └── utils/shareCard.ts
    ├── index.html
    └── package.json
```

---

## Segurança

- `correctAnswer` **nunca** é exposto na rota GET `/api/questions`
- Rate limiting: 100 requisições por 15 minutos por IP
- CORS restrito ao `FRONTEND_URL` configurado
- Validação Zod rejeita payloads malformados
- Helmet define headers de segurança defensiva

---

## Contribuição

Contribuições são bem-vindas! Abre uma issue ou pull request em:
[https://github.com/tiagodearaujo13-lab/cognirav](https://github.com/tiagodearaujo13-lab/cognirav)

---

## Licença

MIT © [tiagodearaujo13-lab](https://github.com/tiagodearaujo13-lab)
