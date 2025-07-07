import { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../api/bookingApi";

export default function BookingSystem() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    name: "",
    phone: "",
  });

  // Load bookings on mount
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const fetched = await fetchBookings();
    setBookings(fetched);
  };

  // Create a new booking
  const handleCreateBooking = async () => {
    if (!newBooking.name || !newBooking.phone) {
      alert("Please fill in both name and phone number");
      return;
    }
    await createBooking(newBooking);
    setNewBooking({ name: "", phone: "" }); // Reset form
    await loadBookings(); // Refresh list
  };

  // Update booking status
  const handleUpdateStatus = async (id, newStatus) => {
    await updateBooking(id, { status: newStatus });
    await loadBookings();
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await deleteBooking(id);
      await loadBookings();
    }
  };

  return (
    <div className="container mt-4">
      <h1>Booking System 💈</h1>

      {/* Form to create new booking */}
      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={newBooking.name}
            onChange={(e) =>
              setNewBooking({ ...newBooking, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={newBooking.phone}
            onChange={(e) =>
              setNewBooking({ ...newBooking, phone: e.target.value })
            }
          />
        </Form.Group>
        <Button
          className="mt-2"
          variant="primary"
          onClick={handleCreateBooking}
        >
          Create Booking
        </Button>
      </Form>

      {/* Table showing all bookings */}
      <h3>All Bookings</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.status}</td>
              <td>
                {b.timestamp?.toDate
                  ? b.timestamp.toDate().toLocaleString()
                  : "N/A"}
              </td>
              <td>
                {/* Buttons to update or delete */}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleUpdateStatus(b.id, "in_progress")}
                  className="me-1"
                >
                  Start
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdateStatus(b.id, "done")}
                  className="me-1"
                >
                  Done
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteBooking(b.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
