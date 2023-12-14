<script>
    import '../app.css';
    import {DOMPurifyConfig, Utils} from "$lib/utils";
    import {Badge, Button, Icon} from "sveltestrap";
    import {onMount} from "svelte";

    function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");
  navigator.clipboard.writeText(copyText.textContent);

  // Alert the copied text
  alert("Copied the text: " + copyText.textContent);
}
    onMount(() => {
        [...document.getElementsByTagName("pre")].forEach(Utils.add_copy_button)
    })
</script>

<!--<div id="myInput">-->
<!--    <div class="position-absolute end-0" style="z-index: 1">-->
<!--    <Button on:click={() => myFunction()}><Icon name="clipboard-plus" /></Button>-->
<!--</div>-->

{@html Utils.render_markdown(`
# foo

\`\`\`asp
a(1) :- #count{X : b(X)} == 1.
a(1) :- #sum+{X : b(X)} == 1.
a("foo",bar,0). #inf not [ ] 0b01
:~ foo. [1@1]

count(here).
%* comment *%
% comment
%comment

dsa.
#show foo.

\`\`\`


\`\`\`asp
foo.
\`\`\`

`, new DOMPurifyConfig({
      PURIFY_LOG_ERRORS: 'true',
  PURIFY_ALLOWED_TAGS: 'a body code em h1 h2 h3 h4 h5 h6 img li ol p pre span strong table tbody td th thead tr ul #text'.split(' '),
  PURIFY_ALLOWED_ATTR: 'alt class href src style title'.split(' '),
}))}
<!--</div>-->
