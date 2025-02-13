<script lang="ts">
// Original version: https://www.richardn.ca/posts/SveltKitToastMessages/#toastmanagersvelte
// Author: RichardN
//
// Changes by Mario Alviano
// - update sveltestrap
// - handle four managers
// - support icons in addition to colors

  import { onMount } from "svelte";
import {Icon, Toast, ToastBody, ToastHeader} from "@sveltestrap/sveltestrap";
  import { NlpToastMessage, toasts } from "./ToastManager";

  export let position = 'is-bottom-right';

  let toastMessages: NlpToastMessage[] = [];

  function get_position(position: string) {
    if (position === 'is-bottom-right') {
      return 'bottom-0 end-0';
    } else if (position === 'is-bottom-left') {
      return 'bottom-0 begin-0';
    } else if (position === 'is-top-left') {
      return 'top-0 begin-0';
    } else if (position === 'is-top-right') {
      return 'top-0 end-0';
    }
  }

  onMount(() => {
    return toasts.subscribe((_entries: NlpToastMessage[]) => {
      toastMessages = _entries.filter(toast => toast.position === position);
    });
  });
</script>

<div class="toast-container position-fixed {get_position(position)} p-3 w-50">
  {#each toastMessages as entry}
    <Toast autohide class="w-100">
      {#if ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].includes(entry.color)}
        <ToastHeader icon="{entry.color}" toggle="{entry.dismiss}" style="font-size: { entry.props.header_font_size || '150%' };">
          {entry.title}
        </ToastHeader>
      {:else}
        <ToastHeader toggle="{entry.dismiss}" style="font-size: { entry.props.header_font_size || '150%' };">
          <Icon slot="icon" name="{entry.color}" class="me-2" />
          {entry.title}
        </ToastHeader>
      {/if}
      {#if entry.body}
        <ToastBody style="font-size: { entry.props.body_font_size || '110%' };">
          {#if entry.props.html_body}
            {@html entry.body}
          {:else}
            {entry.body}
          {/if}
        </ToastBody>
      {/if}
    </Toast>
  {/each}
</div>