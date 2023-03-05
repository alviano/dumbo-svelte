<script>
    import {basicSetup, EditorView} from "codemirror";
    import {onDestroy, onMount} from "svelte";
    import {keymap} from "@codemirror/view";
    import {defaultKeymap, indentLess, insertTab} from "@codemirror/commands";
    import {Badge} from "sveltestrap";

    export let value = '';
    export let readonly = false;

    let textarea;
    let inject;
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
                EditorView.editable.of(!readonly),
                EditorView.updateListener.of((view) => {
                    if (view.docChanged) {
                        textarea.value = value = view.state.doc;
                    }
                }),
            ],
        });
        inject.appendChild(view.dom);
    });

    onDestroy(() => {
        if (view) {
            view.dom.remove();
        }
    });
</script>

<textarea bind:this={textarea} class="d-none" {...$$restProps}></textarea>
<div bind:this={inject}>
    {#if readonly}
        <Badge class="float-end" color="warning">readonly</Badge>
    {/if}
</div>
