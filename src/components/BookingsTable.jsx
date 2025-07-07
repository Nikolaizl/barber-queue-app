import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button, Table } from "react-bootstrap";

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    const bookingsRef = collection(db, "bookings"); // Reference to "bookings" collection
    const q = query(bookingsRef, orderBy("timestamp", "asc")); // Sort by timestamp ascending
    const snapshot = await getDocs(q); // Get all docs
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Spread document data into an object
    }));
    setBookings(data); // Update state
  };

  // Run once when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Update status of a booking
  const handleUpdateStatus = async (id, newStatus) => {
    const docRef = doc(db, "bookings", id);
    await updateDoc(docRef, { status: newStatus });
    fetchBookings(); // Refresh list after update
  };

  // Delete a booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await deleteDoc(doc(db, "bookings", id));
      fetchBookings(); // Refresh list after delete
    }
  };

  return (
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
            <td>
              <span
                className={`badge bg-${
                  b.status === "done"
                    ? "success"
                    : b.status === "calling"
                    ? "warning"
                    : b.status === "missed"
                    ? "dark"
                    : "secondary"
                }`}
              >
                {b.status}
              </span>
            </td>
            <td>
              {b.timestamp?.toDate
                ? b.timestamp.toDate().toLocaleString()
                : "N/A"}
            </td>
            <td>
              {/* Buttons to update status */}
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleUpdateStatus(b.id, "calling")}
                className="me-1"
              >
                Call
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
                variant="dark"
                size="sm"
                onClick={() => handleUpdateStatus(b.id, "missed")}
                className="me-1"
              >
                Missed
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(b.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
