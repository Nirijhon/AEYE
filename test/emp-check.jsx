/* One-off check: mount the admin Employees tab in jsdom. */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://aeye.local/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
globalThis.sessionStorage = dom.window.sessionStorage;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Node = dom.window.Node;
if (typeof globalThis.navigator === 'undefined') globalThis.navigator = dom.window.navigator;
globalThis.scrollTo = () => {};
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };

const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const { act } = await import('react-dom/test-utils');
const { ToastProvider } = await import('../src/components/ui/Toast');
const { EmployeesTab } = await import('../src/pages/admin/AdminOps.jsx');

const root = createRoot(document.getElementById('root'));
await act(async () => {
  root.render(<ToastProvider><EmployeesTab /></ToastProvider>);
});
await new Promise((r) => setTimeout(r, 700));
const html = document.getElementById('root').innerHTML;
const checks = ['EMP-001', 'M. dela Cruz', 'Employee list', 'TESDA NCC II', 'On Duty'];
let fail = 0;
for (const c of checks) {
  const ok = html.includes(c);
  if (!ok) fail += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'} employees: renders "${c}"`);
}
if (html.trim().length < 100) { console.log('FAIL employees: empty output'); fail += 1; }
root.unmount();
process.exit(fail ? 1 : 0);
