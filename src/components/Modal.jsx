import Modal from 'react-modal';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export function ModalComponent({
  isOpen, setIsOpen, children
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
    >
      {children}
    </Modal>
  );
}