<script>
    import {keydown} from "./stores";
    import {onMount} from "svelte";

    onMount(() => {
        window.addEventListener("keydown", event => {
            // don't interfare with combinations of keys
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }

            // escape just remove the focus from anything
            if (event.key === "Escape") {
                document.activeElement.blur();
                event.preventDefault();
                return;
            }

            // if something is focused, don't interface
            if (document.activeElement.tagName !== "BODY") {
                return;
            }

            event.uKey = event.key.toUpperCase();
            for (const handler of $keydown) {
                if (handler(event)) {
                    event.preventDefault();
                    return;
                }
            }
        });
    });
</script>