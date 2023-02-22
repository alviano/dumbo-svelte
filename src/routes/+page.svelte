<script>
    import '../app.css';
    import {Button} from "sveltestrap";
    import {Utils} from "$lib/utils";
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Button on:click={() => {Utils.snackbar('ok')}}>press me</Button>