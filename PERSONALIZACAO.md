# 🎉 Guia de Personalização do Convite

## ✅ O que já foi feito

### Correções Aplicadas:
1. ✅ Removido código desnecessário (auth, banco de dados, server-side)
2. ✅ Ajustado para Vite 5 (estável)
3. ✅ Corrigido erro do TypeScript (`baseUrl` deprecated)
4. ✅ Imagem real `sealed.jpg` configurada
5. ✅ Cores do Tailwind configuradas
6. ✅ Estrutura de dados do convite corrigida
7. ✅ Porta configurada para 8081

### Estado Atual:
- ✅ Projeto rodando em `http://localhost:8081`
- ✅ Sem erros de compilação
- ✅ Pronto para personalização

---

## 📝 Como Personalizar

### 1. Informações do Evento

Edite o arquivo `src/lib/invite.ts`:

```typescript
export const INVITE = {
  // PERSONALIZE AQUI:
  honoree: "Débora",              // Nome da aniversariante
  monogram: "D",                  // Inicial para o monograma
  tagline: "Meus 15 Anos",        // Frase de destaque
  
  // Versículo bíblico
  verse: "O Senhor é a minha força...",
  verseRef: "Salmos 28:7",
  
  // Data e hora
  weekday: "Sábado",
  day: "18",
  month: "Abril",
  year: "2026",
  timeLabel: "às 18h",
  
  // Código de vestimenta
  dressCode: "Traje Esporte Fino",
  
  // Local do evento
  venue: {
    name: "Salão de Festas Estrela",           // ALTERE AQUI
    address: "Rua das Flores, 123 - Centro",   // ALTERE AQUI
    mapsUrl: "https://maps.google.com/...",    // ALTERE AQUI
  },
  
  // PIX para presentes
  pixKey: "seuemail@example.com",    // ALTERE PARA SEU PIX REAL
  pixLabel: "PIX da Déb",
  
  // WhatsApp para confirmação
  whatsappNumber: "5511999999999",   // ALTERE PARA NÚMERO REAL
};
```

### 2. Imagens

#### Envelope (Obrigatório)
1. Coloque suas imagens em `public/images/`:
   - `sealed.jpg` - Envelope fechado ✅ (já configurada)
   - `opening.jpg` - Envelope abrindo (use imagem diferente ou igual)

#### Decoração Floral (Opcional)
- `public/images/floral-top.jpg` - Decoração nos modais
- Atualmente usando gradiente CSS, mas você pode adicionar imagem real

### 3. Lista de Presentes

No mesmo arquivo `src/lib/invite.ts`, edite `GIFT_GROUPS`:

```typescript
export const GIFT_GROUPS = [
  {
    label: "Cozinha",
    items: [
      "Jogo de panelas",      // Personalize aqui
      "Liquidificador",
      // ... adicione mais itens
    ],
  },
  // ... adicione mais categorias
];
```

### 4. Cores e Estilo

Para mudar as cores, edite `tailwind.config.js`:

```javascript
colors: {
  plum: {
    DEFAULT: "#4A2C5A",  // Cor principal (roxo)
    deep: "#2d1838",     // Roxo escuro
  },
  // ... outras cores
}
```

E/ou `src/styles.css` para variáveis CSS customizadas.

---

## 🚀 Para Testar Localmente

1. **Instalar dependências** (se ainda não fez):
```bash
npm install
```

2. **Rodar o projeto**:
```bash
npm run dev
```

3. **Abrir no navegador**:
```
http://localhost:8081
```

---

## 📦 Para Fazer Deploy

### Opção 1: GitHub Pages

1. **Criar repositório no GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

2. **Ajustar `vite.config.ts`**:
```typescript
export default defineConfig({
  base: '/SEU-REPO/',  // Nome do seu repositório
  // ...
});
```

3. **No GitHub**:
   - Settings → Pages
   - Source: GitHub Actions
   - O workflow em `.github/workflows/deploy.yml` já está configurado!

4. **Push para ativar o deploy**:
```bash
git push
```

### Opção 2: Vercel (Mais Fácil)

```bash
npm install -g vercel
vercel --prod
```

Siga as instruções e pronto! ✨

---

## 🎨 Próximos Passos Recomendados

1. [ ] Substituir imagem `opening.jpg` por uma imagem diferente
2. [ ] Atualizar informações do evento (endereço, data, etc)
3. [ ] Configurar PIX e WhatsApp reais
4. [ ] Personalizar lista de presentes
5. [ ] Adicionar imagem `floral-top.jpg` (opcional)
6. [ ] Testar em dispositivos móveis
7. [ ] Fazer deploy no GitHub Pages ou Vercel

---

## 📞 Dicas Finais

- **WhatsApp**: Formato deve ser `5511999999999` (código do país + DDD + número)
- **PIX**: Pode ser email, CPF, telefone ou chave aleatória
- **Imagens**: Mantenha leves (< 500KB cada) para carregar rápido
- **Google Maps**: Cole a URL completa do Google Maps do local

---

Boa sorte com a festa! 🎊✨
