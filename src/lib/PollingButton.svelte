<script>
  import { Button, Progress } from '@sveltestrap/sveltestrap';
  import { onDestroy } from 'svelte';
  import Tooltip from '$lib/Tooltip.svelte';

  export let interval;
  export let ticks = 0;
  export let measure = 'seconds';
  export let color = 'secondary';

  export let click = () => {};

  const tick_times = {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
  };

  function onclick() {
    click();
    ticks = 0;
  }

  const interval_id = setInterval(() => {
    ticks += 1;
    if (ticks >= interval) {
      onclick();
    }
  }, tick_times[measure]);

  onDestroy(() => {
    clearInterval(interval_id);
  });
</script>

<Button block {color} on:click={onclick}>
  <slot />
  <Tooltip value="Auto click in {interval - ticks} {measure}...">
    <Progress striped {color} value={ticks} max={interval} />
  </Tooltip>
</Button>
