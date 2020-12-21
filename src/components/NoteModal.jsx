import React from "react";

import { Modal, Button } from "react-bootstrap";
import { Spacer } from ".";

function NoteModal({ date, title, onHide, content, ...rest }) {
  return (
    <Modal
      {...rest}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <div className="h6 px-0">{date}</div>
        <Spacer />
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NoteModal;
