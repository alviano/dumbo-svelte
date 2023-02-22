<script>
  import { Button, Icon } from 'sveltestrap';

  export let color = 'secondary';
  export let href = '#';
</script>

<Button {color} {href} target="_blank" class={$$props.class}>
  <Icon name="link-45deg" class="me-1" />
  <slot />
</Button>
