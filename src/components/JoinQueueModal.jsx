import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function JoinQueueModal({ show, handleClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Called when user clicks "Confirm"
  const handleConfirm = () => {
    // Basic validation: check both fields are filled
    if (!name || !phone) {
      alert("Please fill in all fields");
      return;
    }

    // Call parent-provided submit function with form data
    onSubmit({ name, phone });

    // Clear input fields
    setName("");
    setPhone("");

    // Close the modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Join Queue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update phone state
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
