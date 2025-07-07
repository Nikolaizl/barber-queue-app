import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import BookingsTable from "../components/BookingsTable";

export default function AdminView() {
  // Track the currently logged-in user (null if not logged in)
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Listen to auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth changes
    });

    // Clean up the listener when component unmounts to avoid memory leaks, warnings etc
    return () => unsubscribe();
  }, []);

  // Handle logout button click
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>

      {!user ? (
        // If no user logged in, show login button and modal
        <>
          <Button variant="primary" onClick={() => setShowLogin(true)}>
            Login as Admin
          </Button>
          <LoginModal
            show={showLogin}
            handleClose={() => setShowLogin(false)}
            onLoginSuccess={() => setShowLogin(false)}
          />
        </>
      ) : (
        // If user is logged in, show logout button and booking table
        <>
          <Button variant="secondary" className="mb-3" onClick={handleLogout}>
            Log Out
          </Button>
          <BookingsTable />
        </>
      )}
    </div>
  );
}
