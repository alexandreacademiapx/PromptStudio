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

## O que ja ficou separado aqui

- `www/index.html`: copia da V3 com ajustes para uso mobile e iPhone
- `capacitor.config.json`: configuracao base do app
- `package.json`: comandos do projeto

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
