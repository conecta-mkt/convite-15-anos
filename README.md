# 🎉 Convite Digital - 15 Anos da Débora

Convite digital interativo para a festa de 15 anos da Débora.

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+ instalado

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd niver2
```

2. Instale as dependências:
```bash
npm install
```

3. **IMPORTANTE**: Adicione as imagens do convite em `public/images/`:
   - `sealed.svg` ou `sealed.jpg` - Envelope fechado
   - `opening.svg` ou `opening.jpg` - Envelope abrindo
   
   (Atualmente tem placeholders SVG que podem ser substituídos)

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra o navegador em `http://localhost:8080`

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Visualiza o build de produção localmente
- `npm run typecheck` - Verifica erros de TypeScript

## 📦 Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite 5** - Build tool e dev server
- **TanStack Router** - Roteamento
- **Tailwind CSS 4** - Estilização
- **Lucide React** - Ícones

## 🎨 Personalização

### Cores do Tema
As cores principais estão definidas no `src/styles.css`:
- Roxo principal: `#4A2C5A`
- Creme: Definido no Tailwind

### Informações do Evento
Edite `src/components/invite/card.tsx` e `src/components/invite/modals.tsx` para atualizar:
- Data e hora do evento
- Local
- Informações de contato
- Lista de presentes

### Imagens
Substitua os arquivos em `public/images/` pelas suas imagens personalizadas.

## 🌐 Deploy

### GitHub Pages

1. Atualize o `vite.config.ts` com o nome do seu repositório:
```typescript
export default defineConfig({
  base: '/nome-do-seu-repo/',
  // ...
});
```

2. Use o GitHub Actions workflow incluído em `.github/workflows/deploy.yml`

3. No GitHub, vá em Settings → Pages → Source → GitHub Actions

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📝 Licença

Este projeto é de uso pessoal.

---

Feito com 💜 para celebrar os 15 anos da Débora
