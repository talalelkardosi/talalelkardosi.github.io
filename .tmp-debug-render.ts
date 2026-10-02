import { JSDOM } from 'jsdom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './src/routeTree.gen.ts';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  Node: dom.window.Node,
  HTMLElement: dom.window.HTMLElement,
  navigator: dom.window.navigator,
});
Object.defineProperty(window, 'matchMedia', { value: () => ({ matches:false, media:'', onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; }}) });
Object.defineProperty(window, 'IntersectionObserver', { value: class { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } } });

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient }, history: createMemoryHistory({ initialEntries: ['/'] }) });

const root = createRoot(document.body);
console.log('before render');
try {
  root.render(React.createElement(RouterProvider, { router }));
  console.log('after render');
  console.log(document.body.innerHTML.slice(0, 300));
} catch (error) {
  console.error('render error');
  console.error(error);
}
process.exit(0);
