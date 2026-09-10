import app from '../server/src/index';

// Serverless Bridge da Vercel: expõe o app Express como Serverless Function.
// O roteamento de /api/* para esta função está configurado em vercel.json.
export default app;
