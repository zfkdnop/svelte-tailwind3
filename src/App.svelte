<script>
  import Router, { push } from 'svelte-spa-router';
  import routes from './routes.js';
  import BinList from './components/BinList.svelte';
  import Link45deg from '@svicons/bootstrap/link-45deg.svelte';
  import List from '@svicons/bootstrap/list.svelte';

  let pHash = '';

  $: if (pHash) push('/read/' + pHash); // only update URL if a paste has been selected

  const routeLoaded = (e) => {
    if (e.detail.location === '/' || !e.detail.params) pHash = '';
    else pHash = e.detail.params.id;
  };

  const btnLogin = (e) => {
    //
  };

  const menuToggle = () => {
    const menu = document.getElementById('mobmen');
    menu.classList.toggle('hidden');
  };
</script>

<div class="flex flex-col grow">
  <div class="flex grow py-1 pl-2 z-20 h-10 shadow-sm shadow-slate-400 bg-sky-600/95 border-b border-black">
    <div class="flex grow justify-between">
      <div class="flex grow">
        <a href="/" class="flex select-none hover:underline">
          <Link45deg class="w-8 h-8 pr-2" width="32px" height="32px" />
          <span class="font-serif text-2xl uppercase">lowkey.link</span>
        </a>
        <span class="font-sans">&nbsp;pastebin</span>
      </div>

      <div class="hidden md:flex my-auto items-center">
        <span class="pr-2 cursor-pointer select-none hover:underline hover:text-white" on:click={btnLogin}>Login</span>
      </div>

      <div class="flex md:hidden my-auto items-center" on:click={menuToggle}>
        <List class="w-8 h-8 pr-2 hover:scale-90" width="32px" height="32px" />
      </div>
    </div>
  </div>

  <div class="flex h-screen">
    <div class="hidden md:flex md:flex-none md:flex-col z-10 shadow-md shadow-slate-400 bg-neutral-200" id="mobmen">
      <BinList resource="https://staging.lowkey.link/api/list" bind:selected={pHash} perPage="8" />
    </div>

    <div class="flex grow py-4 px-2 z-0 bg-slate-50">
      <div class="container mx-auto bg-slate-50">
        <Router {routes} on:routeLoaded={routeLoaded} />
      </div>
    </div>
  </div>
</div>
