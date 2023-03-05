<script>
    import {basicSetup, EditorView} from "codemirror";
    import {onMount} from "svelte";
    import {keymap} from "@codemirror/view";
    import {defaultKeymap, indentLess, insertTab} from "@codemirror/commands";

    export let value = '';

    let textarea;
    let view;

    function update(value) {
        if (value !== view.state.doc) {
            view.update([view.state.update({changes: {from: 0, to: view.state.doc.length, insert: value}})]);
        }
    }
    $: view ? update(value) : null;

    onMount(() => {
        view = new EditorView({
            doc: value,
            extensions: [
                basicSetup,
                keymap.of([
                    defaultKeymap,
                    {
                        key: "Tab",
                        preventDefault: true,
                        run: insertTab,
                    },
                    {
                        key: "Shift-Tab",
                        preventDefault: true,
                        run: indentLess,
                    },
                ]),
                EditorView.updateListener.of((view) => {
                    if (view.docChanged) {
                        textarea.value = value = view.state.doc;
                    }
                }),
            ],
        });
        textarea.insertAdjacentElement("afterend", view.dom);
    });
</script>

<textarea bind:this={textarea} class="d-none" {...$$restProps}></textarea>