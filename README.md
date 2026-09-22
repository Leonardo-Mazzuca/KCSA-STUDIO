# KCSA STUDIO

Portfólio do **KCSA STUDIO**. A demo para o cliente está na pasta `demo/` e é publicada na rota `/demo`.

## Local

```bash
cd demo
npm install
npm run dev
```

Abre em `http://localhost:5173/demo`.

## Vercel

No painel do projeto:

1. **Settings → General → Root Directory:** `demo`
2. **Settings → Build & Deployment:**
   - Install Command: `npm install` (desligue o Override se ainda estiver `npm install --prefix demo`)
   - Build Command: `npm run build`
   - Output Directory: `dist`

O erro `demo/demo/package.json` acontece quando o Root Directory já é `demo` e o Install Command ainda usa `--prefix demo`.

O cliente acessa `https://seu-projeto.vercel.app/demo`.
