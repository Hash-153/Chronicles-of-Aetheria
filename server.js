import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.ts': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
};

function transpileTs(code) {
  let res = code
    // Remove type imports and exports
    .replace(/import\s+type\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
    .replace(/export\s+type\s+[A-Za-z0-9_]+\s*=\s*[^;]+;/g, '')
    .replace(/export\s+interface\s+[A-Za-z0-9_]+(\s+extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '')
    .replace(/interface\s+[A-Za-z0-9_]+(\s+extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '')
    .replace(/type\s+[A-Za-z0-9_]+\s*=\s*[^;]+;/g, '')
    // Remove TS access modifiers
    .replace(/\b(public|private|protected|readonly|override)\s+/g, '')
    // Remove 'as const' and type assertions
    .replace(/\s+as\s+const\b/g, '')
    .replace(/\s+as\s+[A-Za-z0-9_<>[\]|&]+/g, '')
    .replace(/([A-Za-z0-9_\]\)])!/g, '$1')
    // Remove return type annotations on functions/methods: ): Type { => ) {
    .replace(/\)\s*:\s*[A-Za-z0-9_<>[\]|&\s,?]+\s*\{/g, ') {')
    // Remove parameter types
    .replace(/:\s*([A-Za-z0-9_<>[\]|&?]+)(\s*=\s*[^,)]+)?([,)])/g, (m, t, def, end) => (def ? `${def}${end}` : end))
    // Remove variable types
    .replace(/:\s*[A-Za-z0-9_<>[\]|&?]+\s*(?=[=;,])/g, '')
    // Remove generic parameters on function calls: func<Type>( => func(
    .replace(/<[A-Za-z0-9_,\s<>]+>\s*\(/g, '(')
    // Remove generic parameters on class instantiations: new Class<Type>( => new Class(
    .replace(/new\s+([A-Za-z0-9_]+)<[A-Za-z0-9_,\s<>]+>\s*\(/g, 'new $1(');

  return res;
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  if (ext === '.ts') {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const jsContent = transpileTs(rawContent);
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(jsContent);
  } else {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\x1b[32m✔\x1b[0m AetherEngine Live Server listening at http://127.0.0.1:${PORT}`);
});
