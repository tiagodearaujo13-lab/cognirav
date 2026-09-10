import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { testRouter } from './routes/test.routes.js';

const app = express();
const isProduction = process.env['NODE_ENV'] === 'production';

// ── Segurança ─────────────────────────────────────────────────────────────────
// Necessário atrás do proxy da Vercel para o express-rate-limit ler o IP real.
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS restritivo: whitelist explícita + previews *.vercel.app. Nunca `*` com credenciais.
const allowedOrigins = new Set<string>([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://cognirav.vercel.app',
]);

if (process.env['FRONTEND_URL']) {
  for (const origin of process.env['FRONTEND_URL'].split(',')) {
    const trimmed = origin.trim();
    if (trimmed) allowedOrigins.add(trimmed);
  }
}

const vercelPreviewPattern = /^https:\/\/[a-z0-9][a-z0-9-]*\.vercel\.app$/i;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || vercelPreviewPattern.test(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  })
);

// Limites de taxa: global suave + proteção reforçada nas rotas da API (anti força-bruta/scraping).
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas requisições. Tente novamente em 15 minutos.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas requisições à API. Tente novamente em 15 minutos.' },
});

app.use(globalLimiter);

// Payload limitado contra estouro de memória (DoS).
app.use(express.json({ limit: '10kb' }));

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', apiLimiter, testRouter);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// ── Error Handler Centralizado (sempre o último middleware) ───────────────────
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'JSON inválido.' });
    return;
  }
  if (typeof err === 'object' && err !== null && 'type' in err && (err as { type?: string }).type === 'entity.too.large') {
    res.status(413).json({ error: 'Payload demasiado grande.' });
    return;
  }

  console.error('[cognirav] unhandled error:', err);

  if (isProduction) {
    // OWASP: em produção, nunca expor stack traces nem mensagens internas.
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ error: message });
});

// ── Arranque ──────────────────────────────────────────────────────────────────
// Só escuta porta fora da Vercel; em produção serverless o app é exportado
// e executado pela plataforma (ver api/index.ts + vercel.json).
if (!process.env.VERCEL) {
  const PORT = process.env['PORT'] ?? 3001;
  const FRONTEND_URL = process.env['FRONTEND_URL'] ?? 'http://localhost:5173';
  app.listen(PORT, () => {
    console.log(`\n🧠 Cognirav API a correr em http://localhost:${PORT}`);
    console.log(`   Frontend permitido: ${[...allowedOrigins].join(', ')}\n`);
  });
}

export default app;
