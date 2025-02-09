<script>
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
  import newUniqueId from 'locally-unique-id-generator';

  export let message = 'Press OK';
  export let title = 'Alert';
  export let onclose = () => {
    // do nothing
  };

  let isOpen = true;
  let close_button_id = newUniqueId();

  function close() {
    isOpen = false;
    onclose();
  }

  function get_focus() {
    document.getElementById(close_button_id).focus();
  }
</script>

<Modal {isOpen} toggle={close} on:open={() => get_focus()}>
  <ModalHeader toggle={close}>{title}</ModalHeader>
  <ModalBody>{message}</ModalBody>
  <ModalFooter>
    <Button id={close_button_id} color="primary" on:click={close}>
      Close
    </Button>
  </ModalFooter>
</Modal>
