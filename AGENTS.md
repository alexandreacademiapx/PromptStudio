# Prompt Studio - instruções para o Codex

## Contexto do projeto

- Aplicação estática HTML/CSS/JavaScript chamada Prompt Studio Criativo.
- Repositório: `https://github.com/alexandreacademiapx/PromptStudio.git`.
- Site público: `https://www.studioprompts.com.br/`.
- Branch de produção: `main`.
- O GitHub Pages publica a pasta `docs/`.
- A pasta `www/` é o espelho usado pelo projeto local/Capacitor.
- `docs/index.html` e `www/index.html` devem permanecer idênticos.
- Arquivos de mídia usados pelo HTML devem existir em `docs/media/` e `www/media/`.

## Regras obrigatórias

- Antes de editar, execute `git status` e `git pull --ff-only origin main`.
- Não remova nem altere `docs/CNAME`; ele mantém o domínio personalizado.
- Preserve `docs/.nojekyll`.
- Não publique alterações visuais sem aprovação explícita do usuário.
- Para previews, trabalhe em uma cópia separada e não substitua a produção.
- Não exponha senhas, tokens, chaves, e-mails privados ou credenciais no HTML.
- Não adicione bibliotecas, scripts externos ou serviços de terceiros sem explicar o motivo.
- Preserve a política CSP e o redirecionamento HTTPS existente.
- Se o JavaScript inline mudar, recalcule o SHA-256 do conteúdo do `<script>` e atualize o hash em `Content-Security-Policy` nos dois HTMLs.
- Não enfraqueça a CSP com `script-src 'unsafe-inline'`.
- Preserve alterações do usuário e nunca use comandos destrutivos de Git.

## Validação mínima

1. Confirmar que a tela inicial abre o aplicativo.
2. Testar gerador, guia, chips, scroll, vídeos e botões.
3. Testar desktop e mobile, incluindo computadores com desempenho reduzido.
4. Confirmar que o console do navegador não apresenta erros.
5. Confirmar que `docs/index.html` e `www/index.html` são idênticos.
6. Executar `git diff --check` e procurar credenciais antes de publicar.
7. Depois da aprovação, criar commit, fazer push e validar o domínio público.

## Publicação

- A publicação acontece com commit e push para `main`.
- Após o push, aguarde o GitHub Pages atualizar e valide:
  - `http://www.studioprompts.com.br/` redireciona para HTTPS.
  - `https://www.studioprompts.com.br/` retorna a versão nova.
  - Imagens e vídeos retornam sem erro.

