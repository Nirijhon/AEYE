import React from 'react';

const STATIC_MAP = {
  '/': './index.html',
  '/services': './services.html',
  '/about': './about.html',
  '/careers': './careers.html',
  '/track': './track.html',
  '/request-personnel': './request-personnel.html',
  '/dashboard': './dashboard.html',
};

export function toHref(to) {
  if (!to) return '#';
  // pass through external / hash / mailto / tel / already-html / relative html
  if (
    to.startsWith('http://') ||
    to.startsWith('https://') ||
    to.startsWith('mailto:') ||
    to.startsWith('tel:') ||
    to.startsWith('#') ||
    to.endsWith('.html') ||
    to.startsWith('./') ||
    to.startsWith('../')
  ) {
    return to;
  }
  if (STATIC_MAP[to]) return STATIC_MAP[to];
  // dynamic: /careers/:id -> ./job.html?id=:id
  let m = to.match(/^\/careers\/([^/?#]+)(.*)$/);
  if (m) return `./job.html?id=${encodeURIComponent(m[1])}${m[2] || ''}`;
  // dynamic: /apply/:jobId -> ./apply.html?jobId=:jobId
  m = to.match(/^\/apply\/([^/?#]+)(.*)$/);
  if (m) {
    const extra = m[2] || '';
    // if extra already has query, append with &
    if (extra.startsWith('?')) return `./apply.html?jobId=${encodeURIComponent(m[1])}&${extra.slice(1)}`;
    return `./apply.html?jobId=${encodeURIComponent(m[1])}${extra}`;
  }
  // fallback: /foo/bar -> ./foo-bar.html (kebab)
  if (to.startsWith('/')) {
    const clean = to.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
    const q = to.includes('?') ? to.slice(to.indexOf('?')) : '';
    if (!clean) return './index.html';
    return `./${clean.replace(/\//g, '-')}.html${q}`;
  }
  return to;
}

export default function Link({ to, href, children, ...rest }) {
  const finalHref = href || toHref(to || href);
  return (
    <a href={finalHref} {...rest}>
      {children}
    </a>
  );
}
