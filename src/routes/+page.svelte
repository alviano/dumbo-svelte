<script>
    import '../app.css';
    import {DOMPurifyConfig, Utils} from "$lib/utils";
</script>

{@html Utils.render_markdown(`
# foo

\`\`\`asp
a(1) :- #count{X : b(X)} == 1.
a(1) :- #sum+{X : b(X)} == 1.
a("foo",bar,0).
:~ foo. [1@1]

count(here).
%* comment *%
% comment
%comment

dsa.
#show foo.

\`\`\`

`, new DOMPurifyConfig({
      PURIFY_LOG_ERRORS: 'true',
  PURIFY_ALLOWED_TAGS: 'a body code em h1 h2 h3 h4 h5 h6 img li ol p pre span strong table tbody td th thead tr ul #text'.split(' '),
  PURIFY_ALLOWED_ATTR: 'alt class href src style title'.split(' '),
}))}
