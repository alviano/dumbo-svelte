<script>
  import { Tooltip } from 'sveltestrap';
  import newUniqueId from 'locally-unique-id-generator';

  const id = newUniqueId();

  export let value = null;
  export let placement = 'right';
</script>

<span {id}>
  <slot />
</span>
<Tooltip target={id} {placement} class={$$props.class}>
  {#if value}
    {value}
  {:else}
    <slot name="value" />
  {/if}
</Tooltip>
