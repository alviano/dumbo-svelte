<script>
    import {Badge} from "sveltestrap";

    export let color = "secondary";

    let is_mouse_over = false;
</script>

<div class="position-absolute end-0" style="z-index: 1" on:mouseenter={() => is_mouse_over = true} on:mouseleave={() => is_mouse_over = false}>
    <Badge {color} class="{is_mouse_over ? 'opacity-0' : 'opacity-75'}">
        <slot />
    </Badge>
</div>