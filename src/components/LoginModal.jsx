import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminLoginModal({ show, handleClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login button click
  const handleLogin = async () => {
    try {
      // Firebase Auth sign-in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If success: clear any error
      setError("");

      // Notify parent that login succeeded
      onLoginSuccess();

      // Close modal
      handleClose();
    } catch (err) {
      // Set error message for display
      setError("Invalid credentials or error signing in.");
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="Enter admin email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
