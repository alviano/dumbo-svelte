<script>
    import Icon from 'svelte-awesome/components/Icon.svelte';
	import {externalLink} from 'svelte-awesome/icons';

    export let href = '#';
</script>

<a {href} target="_blank" rel="noreferrer"><slot></slot><Icon data={externalLink} class="ms-1" /></a>