# 🎉 Guia Rápido - Convite 15 Anos Débora

## ✅ O que já está pronto

- ✅ Projeto limpo e otimizado para GitHub Pages
- ✅ Vite 5 configurado e funcionando
- ✅ Imagens do convite no lugar (sealed.jpg, opening.jpg, floral-top.jpg)
- ✅ Dependências instaladas
- ✅ Servidor rodando em `http://localhost:8080`

## 🎨 Personalize Seu Convite

### 1. Informações do Evento
Edite o arquivo `src/lib/invite.ts` e atualize:

```typescript
export const INVITE = {
  honoree: "Débora",           // Nome da aniversariante
  weekday: "Sábado",          // Dia da semana
  day: "18",                  // Dia do mês
  month: "Abril",             // Mês
  year: "2026",               // Ano
  timeLabel: "às 18h",        // Horário
  
  // Local
  venue: {
    name: "Salão de Festas Estrela",
    address: "Rua das Flores, 123 - Centro - São Paulo/SP",
    mapsUrl: "https://maps.google.com/?q=...", // Link do Google Maps
  },
  
  // PIX para presentes
  pixKey: "seuemail@example.com",
  pixLabel: "PIX da Déb",
  
  // WhatsApp para confirmação
  whatsappNumber: "5511999999999", // Formato: 55 + DDD + número
};
```

### 2. Versículo Bíblico
Ainda em `src/lib/invite.ts`:

```typescript
verse: "Seu versículo favorito aqui",
verseRef: "Livro 1:1",
```

### 3. Informações Adicionais
Edite as seções:
- `INFO_NOTES` - Notas sobre o evento
- `GIFT_GROUPS` - Sugestões de presentes

## 🖼️ Imagens Disponíveis

Suas imagens em `public/images/`:
- ✅ `sealed.jpg` - Envelope fechado (linda!)
- ✅ `opening.jpg` - Envelope abrindo
- ✅ `floral-top.jpg` - Decoração floral para os modais
- ✅ `gift-*.jpg` - Fotos de presentes (closet, jewelry, makeup, perfume)

## 🚀 Comandos Úteis

```bash
# Rodar localmente
npm run dev

# Gerar build de produção
npm run build

# Testar build de produção
npm run preview

# Verificar erros de TypeScript
npm run typecheck
```

## 📱 Testando

1. **Desenvolvimento**: Acesse `http://localhost:8080`
2. **Mobile**: Use `http://192.168.1.107:8080` (seu IP local) em um celular na mesma rede

## 🌐 Deploy no GitHub Pages

### Passo 1: Criar Repositório no GitHub

```bash
# Inicializar git (se ainda não foi)
git init

# Adicionar arquivos
git add .
git commit -m "Convite 15 anos Débora - versão inicial"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/nome-do-repo.git
git branch -M main
git push -u origin main
```

### Passo 2: Atualizar Base URL

Edite `vite.config.ts` e adicione:

```typescript
export default defineConfig({
  base: '/nome-do-seu-repo/',  // Nome do repositório que você criou
  // ... resto da config
});
```

### Passo 3: Ativar GitHub Pages

1. No GitHub, vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Faça push do código
4. O deploy acontecerá automaticamente!

O workflow já está configurado em `.github/workflows/deploy.yml` ✅

### Passo 4: Acessar o Site

Após o deploy, seu convite estará em:
```
https://seu-usuario.github.io/nome-do-repo/
```

## 🎨 Cores do Tema

Cores principais (definidas em `tailwind.config.js` e `src/styles.css`):
- **Roxo principal**: `#4A2C5A`
- **Roxo profundo**: `#3A1C4A`
- **Lilás**: `#c9a0dc`
- **Creme**: `#FFF8F0`

## 📝 Checklist Final Antes de Publicar

- [ ] Atualizar informações em `src/lib/invite.ts`
- [ ] Testar todas as funcionalidades localmente
- [ ] Conferir se imagens estão carregando
- [ ] Testar RSVP e outros modais
- [ ] Testar em celular
- [ ] Atualizar `base` no `vite.config.ts` com nome do repo
- [ ] Fazer commit e push
- [ ] Ativar GitHub Pages
- [ ] Testar o link publicado

## 🆘 Problemas Comuns

### Página em branco no GitHub Pages
- Verifique se configurou o `base` no `vite.config.ts`
- Verifique se o GitHub Pages está ativo nas configurações

### Imagens não aparecem
- Certifique-se de que estão em `public/images/`
- Caminhos devem começar com `/images/...`

### Erros ao fazer build
- Execute `npm run typecheck` para ver erros de tipo
- Verifique o console do navegador

## 🎁 Funcionalidades

- ✨ Animação de abertura do envelope
- 🎵 Música de fundo (pode ativar/desativar)
- 📱 Responsivo (funciona em celular)
- 🦋 Efeitos de borboletas
- ✨ Partículas e brilhos
- 📅 Botão para adicionar ao calendário
- 📍 Link para o Google Maps
- 💝 PIX para presentes (copiar chave)
- 📲 Confirmação via WhatsApp
- 🎁 Galeria de sugestões de presentes

---

**Feito com 💜 para celebrar os 15 anos da Débora**

Dúvidas? Verifique o `README.md` principal!
