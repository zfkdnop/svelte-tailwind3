import Index from './routes/Index.svelte';
import ReadPaste from './routes/ReadPaste.svelte';
import CreatePaste from './routes/CreatePaste.svelte';
import NotFound from './routes/NotFound.svelte';
import {wrap} from 'svelte-spa-router/wrap';

// export default {
//   '/': wrap({asyncComponent: () => import('./routes/Index.svelte')}),
//   '/read/:id?': wrap({asyncComponent: () => import('./routes/ReadPaste.svelte')}),
//   '/paste': wrap({asyncComponent: () => import('./routes/Paste.svelte')}),
//   '*': NotFound,
// };
export default {
  '/': wrap({component: Index}),
  '/read': wrap({component: Index}),
  '/read/:id': wrap({component: ReadPaste}),
  '/create*': wrap({component: CreatePaste}),
  '/create/:msg': wrap({component: CreatePaste}),
  '*': NotFound,
};
