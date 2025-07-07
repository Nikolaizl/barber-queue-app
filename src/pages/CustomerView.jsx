import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import JoinQueueModal from "../components/JoinQueueModal";

export default function CustomerView() {
  // List of all bookings (filtered)
  const [bookings, setBookings] = useState([]);
  // Control modal visibility for joining queue
  const [showModal, setShowModal] = useState(false);
  // Track which customer is currently being called
  const [callingCustomer, setCallingCustomer] = useState(null);

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    const bookingsRef = collection(db, "bookings"); // Reference to bookings collection
    const q = query(bookingsRef, orderBy("timestamp", "asc")); // Order by time ascending

    const snapshot = await getDocs(q); // Get all bookings
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Spread data fields
    }));

    // Only keep pending and calling customers in queue list
    setBookings(
      data.filter((b) => b.status !== "done" && b.status !== "missed")
    );

    // Find the first booking with status "calling" to show alert
    setCallingCustomer(data.find((b) => b.status === "calling"));
  };

  // Run once when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle user submitting the join queue form
  const handleJoin = async (formData) => {
    // Add new document to bookings collection
    await addDoc(collection(db, "bookings"), {
      name: formData.name,
      phone: formData.phone,
      status: "pending", // Default status when joining
      timestamp: serverTimestamp(),
    });
    await fetchBookings(); // Refresh list after adding
  };

  // Calculate approximate wait time
  const getApproxTime = (index) => {
    const estimatedPerPerson = 15; // Estimated 15 minutes per customer
    return index * estimatedPerPerson;
  };

  return (
    <div className="container mt-4">
      <h2>Welcome to Barber Hikari</h2>

      {/* Alert showing who is currently being called */}
      {callingCustomer && (
        <div className="alert alert-danger text-center">
          📢 <strong>Now Serving:</strong> Mr./Ms. {callingCustomer.name} 📢
        </div>
      )}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowModal(true)}
      >
        Join Queue
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Approx Wait</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.name}</td>
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
              <td>{getApproxTime(index)} mins</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <JoinQueueModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSubmit={handleJoin}
      />
    </div>
  );
}
