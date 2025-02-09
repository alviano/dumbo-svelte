<script>
  import { Button } from '@sveltestrap/sveltestrap';

  export let assign_to;
  export let value;
  export let assign = true;

  export let block = null;
  export let color = 'secondary';
  export let disabled = null;
  export let size = null;

  export let click = (event) => {};

  function onclick(event) {
    click(event);
    if (assign) {
      assign_to = value;
    }
  }
</script>

<Button
  active={assign_to === value}
  outline={assign_to !== value}
  on:click={onclick}
  {block}
  {color}
  {disabled}
  {size}
  class={$$props.class}
>
  <slot />
</Button>
