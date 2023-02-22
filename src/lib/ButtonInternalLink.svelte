<script>
  import InternalLink from '$lib/InternalLink.svelte';

  export let href = '#';

  export let block = null;
  export let color = 'secondary';
  export let disabled = null;
  export let outline = null;
  export let size = null;
  export let title = null;

  export let target = null;
</script>

<InternalLink role="button" {href} {block} {color} {disabled} {outline} {size} {title} {target} class={$$props.class}>
  <slot />
</InternalLink>
