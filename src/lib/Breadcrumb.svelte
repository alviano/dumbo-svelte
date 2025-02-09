<script>
  import { Breadcrumb, BreadcrumbItem } from '@sveltestrap/sveltestrap';
  import InternalLink from '$lib/InternalLink.svelte';

  export let path = [['home', '/']];
</script>

{#if path}
  <Breadcrumb class={$$props.class}>
    {#each path as [key, value]}
      <BreadcrumbItem>
        {#if value}
          <InternalLink href={value}>{key}</InternalLink>
        {:else}
          {key}
        {/if}
      </BreadcrumbItem>
    {/each}
  </Breadcrumb>
{/if}
