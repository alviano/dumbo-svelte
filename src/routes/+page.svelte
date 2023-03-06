<script>
    import '../app.css';
    import {Button, Input} from "sveltestrap";
    import {DOMPurifyConfig, Utils} from "$lib/utils";
    import {keydown} from "$lib/stores";
    import Keybindings from "$lib/Keybindings.svelte";

    $keydown.push((event) => {
        console.log(event);
        return false;
    });



</script>

<Keybindings />

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Button on:click={() => {Utils.snackbar('ok')}}>press me</Button>

{@html Utils.render_markdown("_foo_", new DOMPurifyConfig({
    PURIFY_ALLOWED_TAGS: ['p', 'em', '#text']
}))}

