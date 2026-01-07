import React from 'react'
import { Modal ,Button} from 'react-bootstrap'

function MyModal({
    show,
    onClose,
    title,children,onSave,showSaveButton = true,
    saveText,
    closeText = "Close",
}) {
    return (
        <Modal show={show} onHide={onClose} centered scrollable dialogClassName="modal-80w">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-scrollbar">{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {closeText}
        </Button>

        {showSaveButton && (
          <Button style={{backgroundColor:"#ad7b1eb8"}} onClick={onSave}>
            {saveText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
    )
}

export default MyModal
