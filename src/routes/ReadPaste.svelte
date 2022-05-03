<script>
  import { encode } from 'html-entities';

  async function getData() {
    if (typeof window === 'undefined') return;
    const r = await fetch(RESOURCE).then((resp) => {
      return resp.json();
    });
    return r;
  }
  export let params = undefined;
  let RESOURCE, data;

  $: {
    if (params && params.id && typeof params.id.length === 'number' && params.id.length === 32) {
      RESOURCE = 'https://staging.lowkey.link/api/read/' + params.id;
      data = getData();
    }
  }
</script>

<center class="border-0">
  {#await data}
    <div class="text-center animate-ping">loading...</div>
  {:then data}
    {#if !data || !data.result || data.result !== 'ok' || !data.data}
      <div class="animate-bounce m-4"><span class="text-rose-500">failed loading paste</span></div>
    {:else}
      <span class="text-lg font-semibold">{data.data.subject}</span>
      <hr class="mb-4" />
      <pre class="font-sans">{@html encode(data.data.data)}</pre>
    {/if}
  {/await}
</center>
