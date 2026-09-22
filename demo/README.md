# KCSA STUDIO — Demo

Pasta isolada para apresentação ao cliente. O site é publicado na rota **`/demo`**.

## Como rodar localmente

```bash
cd demo
npm install
npm run dev
```

Abre em `http://localhost:5173/demo`.

A raiz (`/`) redireciona automaticamente para `/demo`.

## Subir na Vercel

Na pasta do projeto (raiz `KCSA STUDIO` ou `demo`):

```bash
npx vercel
```

Depois, para produção:

```bash
npx vercel --prod
```

O cliente acessa:

`https://seu-projeto.vercel.app/demo`

### Pelo dashboard da Vercel

1. Importe o repositório
2. Se o repositório for a pasta `KCSA STUDIO` inteira, não altere o Root Directory — o `vercel.json` da raiz já aponta para `demo/`
3. Se o Root Directory for só `demo`, use o `vercel.json` que já está dentro de `demo/`
4. Deploy

## Rotas

As rotas vêm da pasta do projeto, em `src/routes.tsx`:

- `/` → redireciona para `/demo`
- `/demo` → site do KCSA STUDIO (pasta `demo/`)

## Onde editar conteúdo

- Contato, copy e localização: `src/data/site.ts`
- Trabalhos e imagens: `src/data/projects.ts`
- Serviços: `src/data/services.ts`
- Menu: `src/data/navigation.ts`
- Fotos: `public/images/`

Links de Instagram, WhatsApp e e-mail estão como placeholder.

## Stack

React, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, Aceternity UI, Lucide.
