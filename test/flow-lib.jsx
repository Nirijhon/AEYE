/* FLOW TEST — applicant, client, tracker journeys in jsdom.
   Run via: node test/smoke-runner.mjs flow-lib */
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://aeye.local/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Node = dom.window.Node;
/* react-dom references `navigator` at import time — Node < 21 has no global
   navigator, so provide the jsdom one when missing (keeps CI green on Node 20). */
if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = dom.window.navigator;
}
dom.window.scrollTo = () => {};
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
const W = dom.window;

/* App modules are imported AFTER the DOM globals exist — react-dom reads
   `window` while evaluating, and static ESM imports would hoist above it. */
const { createRoot } = await import('react-dom/client');
const { MemoryRouter, Routes, Route } = await import('react-router-dom');
const { ToastProvider } = await import('../src/components/ui/Toast');
const Apply = (await import('../src/pages/apply/Apply.jsx')).default;
const RequestPersonnel = (await import('../src/pages/request/RequestPersonnel.jsx')).default;
const TrackStatus = (await import('../src/pages/TrackStatus.jsx')).default;
const byId = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function setValue(el, value) {
  const proto = el instanceof W.HTMLSelectElement ? W.HTMLSelectElement.prototype : W.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
  el.dispatchEvent(new W.Event(el instanceof W.HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
}
function click(sel) {
  const el = document.querySelector(sel);
  if (!el) throw new Error('click target not found: ' + sel);
  el.dispatchEvent(new W.MouseEvent('click', { bubbles: true, cancelable: true }));
}
const hasText = (sel, text) => {
  const el = document.querySelector(sel);
  return Boolean(el) && el.textContent.replace(/\s+/g, ' ').includes(text);
};
const results = [];
const check = (name, ok) => {
  results.push([name, ok]);
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name}`);
};
const mount = (entry, path, Page) => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <ToastProvider>
      <MemoryRouter initialEntries={[entry]}>
        <Routes><Route path={path} element={<Page />} /></Routes>
      </MemoryRouter>
    </ToastProvider>
  );
  return root;
};

export default async function run() {
  await applicantFlow();
  await requestFlow();
  await trackFlow();
  const fails = results.filter(([, ok]) => !ok).length;
  writeFileSync('test/flow-results.json', JSON.stringify(results, null, 2));
  console.log(fails === 0 ? 'FLOW TESTS PASSED' : `${fails} FLOW TEST(S) FAILED`);
  process.exitCode = fails === 0 ? 0 : 1;
}

async function applicantFlow() {
  const root = mount('/apply/1', '/apply/:jobId', Apply);
  await sleep(60);
  check('apply: step 1 renders', hasText('#root', 'City of residence'));
  click('button[type="submit"]');
  await sleep(40);
  check('apply: empty submit blocked', hasText('#root', 'First name is required'));
  setValue(byId('firstName'), 'Juan');
  setValue(byId('lastName'), 'Dela Cruz');
  setValue(byId('email'), 'juan@example.com');
  setValue(byId('phone'), '+63 917 123 4567');
  setValue(byId('city'), 'Quezon City');
  click('button[type="submit"]');
  await sleep(60);
  // diagnostics
  const errs = [...document.querySelectorAll('.form-error')].map((e) => e.textContent.trim());
  const inputs = ['firstName', 'lastName', 'email', 'phone', 'city'].map((id) => `${byId(id)?.value ?? 'MISSING'}`);
  console.log('DIAG step2-check errors=', JSON.stringify(errs), ' inputs=', JSON.stringify(inputs));
  check('apply: step 2 after valid step 1', hasText('#root', 'Security experience'));
  click('input[type="radio"][value="1-3"]');
  setValue(byId('eduLevel'), 'College graduate');
  click('button[type="submit"]');
  await sleep(60);
  check('apply: review step rendered', hasText('#root', 'Confirmations'));
  click('#consent');
  click('button[type="submit"]');
  await sleep(1400);
  const ref = document.getElementById('root').innerHTML.match(/APP-\d+/);
  check('apply: success + reference code', ref !== null && hasText('#root', 'Application received'));
  const stored = JSON.parse(W.localStorage.getItem('aeye.applications') || '[]');
  check('apply: persisted to demo storage', Array.isArray(stored) && ref !== null && stored.some((a) => a.id === ref[0]));
  root.unmount();
  document.getElementById('root').innerHTML = '';
}
async function requestFlow() {
  const root = mount('/request-personnel', '/request-personnel', RequestPersonnel);
  await sleep(50);
  setValue(byId('service'), 'CCTV & Video Surveillance');
  setValue(byId('siteType'), 'Corporate office');
  setValue(byId('city'), 'Makati');
  setValue(byId('headcount'), '4');
  click('button[type="submit"]');
  await sleep(60);
  check('request: step 2 after needs', hasText('#root', 'Shift schedule'));
  setValue(byId('startDate'), new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  setValue(byId('duration'), '6–12 months');
  setValue(byId('shift'), 'Day (06:00–14:00)');
  click('button[type="submit"]');
  await sleep(60);
  check('request: step 3 after schedule', hasText('#root', 'Anything else we should know?'));
  setValue(byId('company'), 'ACME Corp');
  setValue(byId('contactName'), 'Marites Santos');
  setValue(byId('email'), 'marites@acme.ph');
  setValue(byId('phone'), '+63 2 8888 4455');
  click('#consent');
  click('button[type="submit"]');
  await sleep(1300);
  const reqRef = document.getElementById('root').innerHTML.match(/RQ-\d+/);
  check('request: success + RQ reference', reqRef !== null && hasText('#root', 'Request received'));
  root.unmount();
  document.getElementById('root').innerHTML = '';
}

async function trackFlow() {
  const root = mount('/track', '/track', TrackStatus);
  await sleep(50);
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Try with a demo application'));
  check('track: demo button present', Boolean(btn));
  btn.dispatchEvent(new W.MouseEvent('click', { bubbles: true }));
  await sleep(1000);
  check('track: demo tracker renders', hasText('#root', 'Submitted') && hasText('#root', 'DEMO-APP00'));
  root.unmount();
  document.getElementById('root').innerHTML = '';
}