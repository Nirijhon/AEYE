/* ============================================================
   SMOKE TEST — renders every public page in a headless DOM to
   catch runtime errors the production build cannot see.
   Run: node test/smoke-runner.mjs            (pages render test)
        node test/smoke-runner.mjs flow-lib   (user-flow test)
   ============================================================ */
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
globalThis.scrollTo = () => {};
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };

/* App modules are imported AFTER the DOM globals exist — react-dom
   reads `window` while evaluating (static ESM imports hoist above this). */
const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const { MemoryRouter, Routes, Route } = await import('react-router-dom');
const { act } = await import('react-dom/test-utils');
const { ToastProvider } = await import('../src/components/ui/Toast');
const Home = (await import('../src/pages/home/Home.jsx')).default;
const ServicesPage = (await import('../src/pages/Services.jsx')).default;
const About = (await import('../src/pages/About.jsx')).default;
const Careers = (await import('../src/pages/Careers.jsx')).default;
const JobDetail = (await import('../src/pages/JobDetail.jsx')).default;
const Apply = (await import('../src/pages/apply/Apply.jsx')).default;
const TrackStatus = (await import('../src/pages/TrackStatus.jsx')).default;
const RequestPersonnel = (await import('../src/pages/request/RequestPersonnel.jsx')).default;
const Dashboard = (await import('../src/pages/dashboard/Dashboard.jsx')).default;
const Admin = (await import('../src/pages/admin/Admin.jsx')).default;
const NotFound = (await import('../src/pages/NotFound.jsx')).default;

const routes = [
  ['/', Home, '/'],
  ['/services', ServicesPage, '/services'],
  ['/about', About, '/about'],
  ['/careers', Careers, '/careers'],
  ['/careers/:id', JobDetail, '/careers/1'],
  ['/apply/:jobId', Apply, '/apply/1'],
  ['/track', TrackStatus, '/track'],
  ['/request-personnel', RequestPersonnel, '/request-personnel'],
  ['/dashboard', Dashboard, '/dashboard'],
  ['/admin', Admin, '/admin'],
  ['/404', NotFound, '/nope'],
];

export default async function run() {
  let failures = 0;
  for (const [pattern, Page, entry] of routes) {
    const label = `${pattern} (${entry})`;
    try {
      const root = createRoot(document.getElementById('root'));
      await act(async () => {
        root.render(
          <ToastProvider>
            <MemoryRouter initialEntries={[entry]}>
              <Routes>
                <Route path={pattern} element={<Page />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        );
      });
      const html = document.getElementById('root').innerHTML;
      if (!html || html.trim().length < 10) throw new Error('page rendered empty');
      root.unmount();
      console.log(`PASS  ${label}`);
    } catch (err) {
      failures += 1;
      console.log(`FAIL  ${label}`);
      console.log(`      ${err.stack ? err.stack.split('\n').slice(0, 6).join('\n') : err.message}`);
    } finally {
      document.getElementById('root').innerHTML = '';
    }
  }

  console.log(failures === 0 ? '\nALL PAGES RENDER OK' : `\n${failures} PAGE(S) FAILED`);
  process.exitCode = failures === 0 ? 0 : 1;
}