# Guia para continuar o Prompt Studio no Mac

## 1. Trocar o e-mail com segurança

1. No GitHub, abra `Settings > Emails`.
2. Adicione seu e-mail pessoal e confirme a mensagem recebida.
3. Defina o e-mail pessoal como `Primary`.
4. Ative autenticação em dois fatores e guarde os códigos de recuperação.
5. Só depois remova o e-mail empresarial.
6. No PowerShell do Avell, execute:

```powershell
git config --global user.name "Alexandre Machado"
git config --global user.email "SEU_EMAIL_PESSOAL"
```

Essa troca não derruba nem altera o site. O comando apenas muda o autor dos próximos commits feitos nesse computador.

## 2. Preparar o Mac

1. Instale o GitHub Desktop no Mac.
2. Entre no GitHub com a conta que controla o repositório `PromptStudio`.
3. Instale o aplicativo Codex e entre com sua conta pessoal do Codex.
4. No GitHub Desktop, escolha `Clone repository` e selecione `PromptStudio`.
5. Escolha uma pasta fácil de localizar no Mac e conclua o clone.
6. No Codex, abra exatamente a pasta clonada do `PromptStudio` como workspace.

As contas do Codex e do GitHub são independentes. Elas podem usar e-mails diferentes. O Codex trabalha nos arquivos locais; o GitHub Desktop envia as alterações para o site.

## 3. Primeira conversa no Codex pessoal

Cole esta mensagem:

```text
Leia primeiro os arquivos AGENTS.md, GUIA_MIGRACAO_CODEX_MAC.md, README.md e todo o repositório aberto. Este é o Prompt Studio Criativo publicado em https://www.studioprompts.com.br/. O GitHub Pages publica a pasta docs e a pasta www deve permanecer como espelho. Não altere nem publique nada antes de entender o projeto e me apresentar um diagnóstico curto. Preserve o CNAME, a segurança CSP, todas as mídias e o visual aprovado. Para alterações visuais, faça primeiro um preview separado e só publique quando eu aprovar explicitamente.
```

O `AGENTS.md` será carregado automaticamente pelo Codex quando a pasta do projeto estiver aberta.

## 4. Processo de atualização

1. Abra o GitHub Desktop e clique em `Fetch origin` ou `Pull origin`.
2. Abra a pasta clonada no Codex.
3. Peça a alteração e solicite um preview quando for mudança visual.
4. Revise e aprove a versão.
5. Peça ao Codex para sincronizar `www/` e `docs/`, testar e publicar.
6. No GitHub Desktop, confirme que o commit e o push foram enviados.
7. Aguarde alguns minutos e teste `https://www.studioprompts.com.br/`.

## 5. O que guardar

- Acesso à conta do GitHub.
- Acesso ao Registro.br, que controla o domínio e o DNS.
- Códigos de recuperação da autenticação em dois fatores.
- Um ZIP de backup do projeto em armazenamento pessoal.

