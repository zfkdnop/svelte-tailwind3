<script>
  import { now } from 'svelte/internal';
  import { push } from 'svelte-spa-router';
  import PencilSquare from '@svicons/bootstrap/pencil-square.svelte';
  import ArrowRepeat from '@svicons/bootstrap/arrow-repeat.svelte';
  import ArrowRight from '@svicons/bootstrap/arrow-right.svelte';
  import ArrowLeft from '@svicons/bootstrap/arrow-left.svelte';

  async function getData() {
    if (typeof window === 'undefined') return;
    return await fetch(resource + '/count', {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((resp) => {
        return resp.json();
      })
      .then(async (resp) => {
        totalPages = Math.ceil(resp.data.count / perPage) || 1; // Math.ceil() returns 0 instead of NaN
        return await fetch(resource, {
          method: 'GET',
          cache: 'no-cache',
          // headers: { 'XX-SeekStart': seekStart, 'XX-SeekEnd': seekEnd },
          headers: { 'XX-Offset': offset, 'XX-Limit': perPage },
        }).then((resp) => {
          return resp.json();
        });
      });
  }

  export let perPage = 15;
  export let offset = 0;
  export let selected;
  export let resource;
  let lastRefresh = 0;
  let paginationDebounce = 0;
  let totalPages = undefined;
  let data = getData();

  const btnRefresh = (e) => {
    if (now() >= lastRefresh + 5000) {
      data = getData();
      lastRefresh = now();
    }
  };
  const toggleSpin = (e) => {
    const b = document.getElementById('btnRefresh');
    if (b) b.classList.toggle('animate-spin');
  };
  const btnCreate = (e) => {
    push('/create');
  };
  const btnPaginate = (i) => {
    if (now() >= paginationDebounce + 650) {
      offset = parseInt(offset) + i;
      if (offset > totalPages) offset = parseInt(totalPages);
      if (offset < 0) offset = 0;
      data = getData();
      paginationDebounce = now();
    }
  };
</script>

{#await data}
  <div class="flex mx-auto cursor-default select-none">
    <div class="flex my-auto animate-ping">loading...</div>
  </div>
{:then data}
  <div class="flex rounded-md py-1 px-2 justify-between">
    <div
      class="rounded-md py-1 px-1 hover:bg-sky-600/95 hover:shadow-lg active:scale-90"
      on:click={btnRefresh}
      on:focus={toggleSpin}
      on:mouseenter={toggleSpin}
      on:blur={toggleSpin}
      on:mouseleave={toggleSpin}
    >
      <ArrowRepeat width="16px" height="16px" id="btnRefresh" />
    </div>
    <div class="rounded-md py-1 px-1 hover:bg-sky-600/95 hover:shadow-lg active:scale-90" on:click={btnCreate}>
      <PencilSquare width="16px" height="16px" id="btnCreate" />
    </div>
  </div>
  {#each data.data as i (i.hash)}
    <div
      class="flex flex-col px-2 cursor-default select-none rounded-md border bg-white 
            hover:bg-stone-300/50 transition duration-500 ease-in hover:ease-out hover:duration-100 hover:scale-105"
      on:mousedown={() => {
        selected = i.hash; /*i.target.parentElement.id || i.target.id;*/
      }}
      id={i.hash}
    >
      <span class="border-b border-b-slate-200/80">{i.subject.length > 24 ? i.subject.substring(0, 24) + '...' : i.subject}</span>
      <div class="flex justify-between">
        <small class="py-1 italic font-light">{i.displayname}</small>
        <small class="py-1 italic font-light">
          {[i.ts].map((v) => {
            let x = new Date(v);
            let hr = new String(x.getHours());
            let min = new String(x.getMinutes());
            return x.toLocaleDateString() + ' ' + (hr.length===1?'0'+hr:hr) + ':' + (min.length===1?'0'+min:min) + ' '; /* FIXME: can this be optimized without using String()'s? */
          })}
        </small>
      </div>
    </div>
  {/each}

  <div class="flex justify-between px-2 pt-1">
    <span
      class="rounded-md py-1 px-1 cursor-default select-none hover:bg-sky-600/95 hover:shadow-lg active:scale-90"
      on:click={() => {
        btnPaginate(-1);
      }}
    >
      <ArrowLeft width="16px" height="16px" id="btnPrev" />
    </span>
    <span class="rounded-md py-1 px-1 cursor-default select-none text-sm">Page {parseInt(offset)+1}</span>
    <span
      class="rounded-md py-1 px-1 cursor-default select-none hover:bg-sky-600/95 hover:shadow-lg active:scale-90"
      on:click={() => {
        btnPaginate(1);
      }}
    >
      <ArrowRight width="16px" height="16px" id="btnNext" />
    </span>
  </div>
{/await}
