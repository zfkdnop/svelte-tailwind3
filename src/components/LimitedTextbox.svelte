<script>
  //   export let type = 'text';
  export let name = undefined;
  export let classes = '';
  export let placeholder = undefined;
  export let required = undefined;
  export let maxlength = undefined;
  export let allowOverflow = false;

  let _maxlength = parseInt(maxlength);
  let count = 0;
  export let value = '';
  let remain = _maxlength; /*_maxlength - count*/

  if (allowOverflow) maxlength = undefined;

  $: if (_maxlength) {
    count = value.length;
    remain = _maxlength - count;
  }
  $: if (_maxlength && !allowOverflow && value.length > _maxlength) value = value.substring(0, _maxlength);

  const prettyNum = (n) => {
      return [...parseInt(n)+""].reverse().map((v, i, r) => {return (i!=0 && i%3==0) ? v+',' : v}).reverse().join('');
  };
</script>

<div class="flex flex-col grow">
  <input type="text" {name} {placeholder} class={classes} {maxlength} {required} bind:value />
  <span class="inline-flex text-xs text-slate-500">
    {@html !_maxlength ? '&infin;' : remain < 0 && _maxlength < 0 ? '0' : prettyNum(remain)} char{remain != 1 && remain != -1 ? 's' : ''} remaining
  </span>
</div>
