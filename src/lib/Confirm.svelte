<script>
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "sveltestrap";
  import newUniqueId from "locally-unique-id-generator";

  export let message = 'Press OK or Cancel';
  export let title = 'Confirm';
  export let onconfirm = () => {
    // do nothing
  };
  export let oncancel = () => {
    // do nothing
  };

  let isOpen = true;
  const close_button_id = newUniqueId();

  function ok() {
    isOpen = false;
    onconfirm();
  }

  function cancel() {
    isOpen = false;
    oncancel();
  }

  function get_focus() {
    document.getElementById(close_button_id).focus();
  }
</script>

<Modal {isOpen} toggle={cancel} on:open={() => get_focus()}>
  <ModalHeader toggle={cancel}>{title}</ModalHeader>
  <ModalBody>{message}</ModalBody>
  <ModalFooter>
    <Button id={close_button_id} color="secondary" on:click={cancel}>Cancel</Button>
    <Button color="primary" on:click={ok}>OK</Button>
  </ModalFooter>
</Modal>
