/* Bootstrap: loads a jsdom-based test through Vite so JSX transforms.
   Usage: node test/smoke-runner.mjs [smoke-lib|flow-lib]   (default smoke-lib) */
import { createServer } from 'vite';

const target = process.argv[2] || 'smoke-lib';

const server = await createServer({
  root: process.cwd(),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});
process.env.CI = '1';
try {
  const mod = await server.ssrLoadModule(`/test/${target}.jsx`);
  if (mod.default) await mod.default();
} catch (err) {
  console.error('TEST RUNNER FAILED:\n' + (err.stack || err.message));
  process.exitCode = 1;
} finally {
  await server.close();
}