import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { testRouter } from './routes/test.routes.js';

const app = express();
const PORT = process.env['PORT'] ?? 3001;
const FRONTEND_URL = process.env['FRONTEND_URL'] ?? 'http://localhost:5173';

// ── Segurança ─────────────────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas requisições. Tente novamente em 15 minutos.' },
  })
);

app.use(express.json({ limit: '50kb' }));

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', testRouter);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// ── Arranque ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧠 Cognirav API a correr em http://localhost:${PORT}`);
  console.log(`   Frontend permitido: ${FRONTEND_URL}\n`);
});

export default app;
