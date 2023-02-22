<script>
  import { Button } from 'sveltestrap';

  export let href = '#';
  export let role = 'link';

  export let block = null;
  export let color = 'secondary';
  export let disabled = null;
  export let outline = null;
  export let size = null;
  export let title = null;

  export let target = null;

  let new_tab;
  let same_tab;

  function onclick(event) {
    const link = event.ctrlKey || event.metaKey || event.altKey ? new_tab : same_tab;
    link.click();
    event.preventDefault();
  }
</script>

{#if role === 'button'}
  <Button {href} {block} {color} {disabled} {outline} {size} {title} on:click={onclick} class={$$props.class}>
    <slot />
  </Button>
{:else}
  <a {href} {color} {disabled} {title} on:click={onclick} class={$$props.class}>
    <slot />
  </a>
{/if}

<a bind:this={new_tab} class="d-none" target="_blank" rel="noreferrer" {href}>new-tab</a>
<a bind:this={same_tab} class="d-none" {target} {href}>same-tab</a>
