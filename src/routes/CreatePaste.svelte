<script>
  import LimitedTextbox from '../components/LimitedTextbox.svelte';
  import LimitedTextarea from '../components/LimitedTextarea.svelte';
  import { push } from 'svelte-spa-router';

  let subjTxt = '';
  let bodyTxt = '';

  const handleSubmit = (e) => {
    if (typeof window === 'undefined') return;
    let frm = document.getElementById('fart');
    if (frm) {
      if (frm.subj.value.length >= 2) frm.subj.classList.remove('invalid');
      else return frm.subj.classList.add('invalid');

      if (frm.body.value.length >= 2) frm.body.classList.remove('invalid');
      else return frm.body.classList.add('invalid');

      const submitResult = fetch('https://staging.lowkey.link/api/create', {
        method: 'POST',
        cache: 'no-cache',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subj: subjTxt, body: bodyTxt})
      })
        .then((resp) => {
          return resp.json();
        })
        .then(async (resp) => {
          if (resp.result === 'ok') {
            const newHash = await fetch('https://staging.lowkey.link/api/hash/' + resp.data, {
              method: 'GET',
              cache: 'no-cache',
              // headers: { 'XX-SeekStart': seekStart, 'XX-SeekEnd': seekEnd },
            }).then((resp) => {
              return resp.json();
            });
            if (newHash.result === 'ok') push('/read/' + newHash.data);
            else console.log("!! Unable to determine the new paste's identifier but the paste was created successfully...");
          } else {
            // failed to paste
            console.log("!! Unable to create new paste.");
          }
        });

      //frm.submit();
    }
  };
</script>

<form method="POST" action="https://staging.lowkey.link/api/create" id="fart">
<div class="flex flex-col items-center"><!-- items-center h-1/2 -->
  <!-- enctype="multipart/form-data" -->
    <div class="flex m-1 p-1 w-1/3">
      <LimitedTextbox
        name="subj"
        placeholder="subject"
        classes="border border-slate-500/10 border-b border-b-sky-600/50 focus:border-b-sky-600/95 focus:outline-none drop-shadow-md focus:shadow-md focus:shadow-sky-600/95"
        required
        maxlength="48"
        allowOverflow={true}
        bind:value={subjTxt}
      />
      <!-- invalid:shadow-red-400/30 invalid:border-b-red-400/30 -->
    </div>
    <div class="flex m-1 p-1 w-1/2 ">
      <LimitedTextarea
        name="body"
        classes="border border-slate-500/10 border-b border-b-sky-600/50 focus:border-b-sky-600/95 focus:outline-none drop-shadow-md focus:shadow-md focus:shadow-sky-600/95"
        required
        maxlength="2000000"
        minlength="2"
        allowOverflow={false}
        realmaxlength={'database limit is actually ~16mb (16000000)'}
        bind:value={bodyTxt}
      />
      <!-- invalid:shadow-red-400/30 -->
    </div>
    <div class="m-1 p-1">
      <div
        on:click={handleSubmit}
        class="cursor-default select-none py-0.5 px-2 bg-sky-400/25 rounded-lg hover:bg-sky-400/50 active:scale-90"
      >
        paste
      </div>
    </div>
</div>
</form>
