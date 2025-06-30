// src/main.ts
import app from './infra/server/server';

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
