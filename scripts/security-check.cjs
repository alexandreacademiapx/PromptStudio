const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'www', 'index.html');
const publishedPath = path.join(root, 'docs', 'index.html');
const previewPath = path.join(root, 'docs', 'social-preview.html');
const failures = [];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function requireCheck(condition, message) {
  if (!condition) failures.push(message);
}

const source = read(sourcePath);
const published = read(publishedPath);
const preview = read(previewPath);
const scripts = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)];

requireCheck(source === published, 'www/index.html e docs/index.html precisam ser idênticos.');
requireCheck(scripts.length === 1, 'A aplicação deve manter exatamente um script inline auditado.');

if (scripts.length === 1) {
  const hash = `sha256-${crypto.createHash('sha256').update(scripts[0][1], 'utf8').digest('base64')}`;
  requireCheck(source.includes(`script-src 'self' '${hash}'`), 'O hash CSP do JavaScript inline está desatualizado.');
}

[
  "script-src-attr 'none'",
  "connect-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "trusted-types 'none'",
  "require-trusted-types-for 'script'",
  'upgrade-insecure-requests'
].forEach((directive) => {
  requireCheck(source.includes(directive), `Diretiva CSP obrigatória ausente: ${directive}`);
});

[
  /\.innerHTML\s*=/,
  /\.outerHTML\s*=/,
  /insertAdjacentHTML\s*\(/,
  /document\.write\s*\(/,
  /\beval\s*\(/,
  /new\s+Function\s*\(/
].forEach((pattern) => {
  requireCheck(!pattern.test(source), `Operação DOM insegura encontrada: ${pattern}`);
});

requireCheck(!/<[^>]+\son[a-z]+\s*=/i.test(source), 'Manipulador JavaScript inline encontrado no HTML.');
requireCheck(!/(?:src|href)\s*=\s*["']http:\/\//i.test(source), 'Recurso HTTP inseguro encontrado.');
requireCheck(source.includes('<meta name="referrer" content="no-referrer">'), 'Política de referrer forte ausente.');
requireCheck(preview.includes('Content-Security-Policy'), 'A página auxiliar de preview está sem CSP.');
requireCheck(read(path.join(root, 'docs', 'CNAME')).trim() === 'www.studioprompts.com.br', 'CNAME publicado foi alterado.');
requireCheck(fs.existsSync(path.join(root, 'docs', '.nojekyll')), 'docs/.nojekyll está ausente.');

const repositoryText = [source, published, preview, read(path.join(root, 'package.json'))].join('\n');
[
  /AKIA[0-9A-Z]{16}/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /AIza[0-9A-Za-z_-]{35}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/
].forEach((pattern) => {
  requireCheck(!pattern.test(repositoryText), `Possível credencial exposta: ${pattern}`);
});

if (failures.length) {
  console.error('Falha na auditoria de segurança:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Auditoria estática de segurança aprovada.');
