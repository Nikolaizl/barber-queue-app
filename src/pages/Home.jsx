import "./Home.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Barber Hikari!</h1>
      <Button
        variant="light"
        className="m-2"
        onClick={() => navigate("/customer")}
      >
        Customer View
      </Button>
      <Button
        variant="outline-light"
        className="m-2"
        onClick={() => navigate("/admin")}
      >
        Admin View
      </Button>
    </div>
  );
}
