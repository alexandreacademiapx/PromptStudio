# Prompt Studio iPhone App

Estrutura pronta para empacotar o `Prompt Studio` como app de iPhone usando `Capacitor`.

## GitHub Pages

Para hospedar no GitHub Pages, use a pasta `docs/`.

Fluxo:

```bash
git add .
git commit -m "Publica Prompt Studio"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

Depois, no GitHub:

1. Abra `Settings`
2. Entre em `Pages`
3. Em `Build and deployment`, escolha:
   `Deploy from a branch`
4. Branch:
   `main`
5. Folder:
   `/docs`

O site vai abrir em:

`https://SEU-USUARIO.github.io/SEU-REPO/`

## Estrutura modular

As pastas `www/` e `docs/` mantêm cópias idênticas da aplicação:

- `index.html`: marcação das telas Gerador e Guia.
- `assets/css/app-core.css`: estrutura e responsividade.
- `assets/css/app-theme.css`: identidade visual e polimento.
- `assets/js/bootstrap.js`: perfil adaptativo de desempenho.
- `assets/js/app.js`: gerador, Angle Lab, Guia e interações.
- `assets/js/ui-polish.js`: componentes e acabamento visual.
- `assets/data/prompt-library.js`: bancos e regras de prompts.
- `assets/data/inspiration-source-prompts.js`: dados do Inspiration Deck.
- `media/`: somente imagens, ícones e vídeos efetivamente utilizados.

O site continua sendo uma única aplicação. A separação existe para melhorar cache, manutenção e auditoria sem quebrar o estado entre Gerador e Guia.

Outros arquivos importantes:

- `capacitor.config.json`: configuração base do app.
- `package.json`: comandos do projeto.
- `scripts/security-check.cjs`: valida a CSP, os módulos e a paridade entre `www` e `docs`.

## Fluxo local

```bash
npm install
npx cap add ios
npx cap sync
npx cap open ios
```

## Observacoes

- O projeto iOS final abre no `Xcode`, entao a compilacao publica precisa ser feita em um Mac.
- Se quiser publicar na App Store, ainda faltam icone, splash, nome final, bundle definitivo e certificado Apple.
- Se o fundo animado ficar pesado no iPhone, a proxima etapa e criar um modo mobile com animacao mais leve.
