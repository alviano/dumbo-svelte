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

{@html Utils.render_markdown(`
\`\`\`python
print("hello")
\`\`\`

\`\`\`js
let x = 5;
\`\`\`

\`\`\`c
int x = 5;
\`\`\`


`, new DOMPurifyConfig({
  PURIFY_LOG_ERRORS: 'true',
  PURIFY_EXTERNAL_LINK_PREFIXES: [
    'https://ssd2020.pythonanywhere.com/',
    'https://cod.alviano.org/',
  ],
  PURIFY_ALLOWED_TAGS: 'a blockquote body br code em h1 h2 h3 h4 h5 h6 hr img li ol p pre span strong table tbody td th thead tr ul #text'.split(' '),
  PURIFY_ALLOWED_ATTR: 'alt class href src style title'.split(' '),
}))}