import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function DetailModal({
  showDetails,
  onCloseDetails,
  contactDetails,
}) {
  return (
    <Modal show={showDetails} onHide={onCloseDetails}>
      <Modal.Header closeButton>
        <Modal.Title>Modal C</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name : {contactDetails.source?.name}</p>
        <p>Title : {contactDetails.title}</p>
        <p>Description : {contactDetails.description}</p>
        <p>PublishedAt : {contactDetails.publishedAt}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          style={{
            backgroundColor: "#ffffff",
            border: "#46139f 2px solid",
            color: "#46139f",
          }}
          onClick={onCloseDetails}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
