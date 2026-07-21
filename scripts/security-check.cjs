const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'www', 'index.html');
const publishedPath = path.join(root, 'docs', 'index.html');
const failures = [];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function requireCheck(condition, message) {
  if (!condition) failures.push(message);
}

const source = read(sourcePath);
const published = read(publishedPath);
const inlineScripts = [...source.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
const modularFiles = [
  'assets/data/inspiration-source-prompts.js',
  'assets/js/bootstrap.js',
  'assets/data/prompt-library.js',
  'assets/js/app.js',
  'assets/js/ui-polish.js',
  'assets/css/app-core.css',
  'assets/css/app-theme.css'
];
const expectedScripts = modularFiles.filter((file) => file.endsWith('.js'));
const scriptSources = [...source.matchAll(/<script\s+[^>]*src=["']\.\/([^"'?]+)(?:\?[^"']*)?["'][^>]*><\/script>/g)]
  .map((match) => match[1]);

requireCheck(source === published, 'www/index.html e docs/index.html precisam ser idênticos.');
requireCheck(inlineScripts.length === 0, 'A aplicação modular não deve conter JavaScript inline.');
requireCheck(source.includes("script-src 'self';"), 'A CSP deve permitir somente scripts locais externos.');
requireCheck(
  JSON.stringify(scriptSources) === JSON.stringify(expectedScripts),
  'A ordem ou a lista de scripts modulares do index.html foi alterada.'
);

modularFiles.forEach((relativePath) => {
  const sourceFile = path.join(root, 'www', relativePath);
  const publishedFile = path.join(root, 'docs', relativePath);
  requireCheck(fs.existsSync(sourceFile), `Módulo ausente em www: ${relativePath}`);
  requireCheck(fs.existsSync(publishedFile), `Módulo ausente em docs: ${relativePath}`);
  if (fs.existsSync(sourceFile) && fs.existsSync(publishedFile)) {
    requireCheck(read(sourceFile) === read(publishedFile), `Módulo divergente entre www e docs: ${relativePath}`);
  }
});

const auditedCode = [source]
  .concat(modularFiles.map((relativePath) => read(path.join(root, 'www', relativePath))))
  .join('\n');

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
  requireCheck(!pattern.test(auditedCode), `Operação DOM insegura encontrada: ${pattern}`);
});

requireCheck(!/<[^>]+\son[a-z]+\s*=/i.test(source), 'Manipulador JavaScript inline encontrado no HTML.');
requireCheck(!/(?:src|href)\s*=\s*["']http:\/\//i.test(source), 'Recurso HTTP inseguro encontrado.');
requireCheck(source.includes('<meta name="referrer" content="no-referrer">'), 'Política de referrer forte ausente.');
requireCheck(read(path.join(root, 'docs', 'CNAME')).trim() === 'www.studioprompts.com.br', 'CNAME publicado foi alterado.');
requireCheck(fs.existsSync(path.join(root, 'docs', '.nojekyll')), 'docs/.nojekyll está ausente.');

const repositoryText = [auditedCode, published, read(path.join(root, 'package.json'))].join('\n');
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
