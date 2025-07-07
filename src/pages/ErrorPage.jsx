import { Image } from "react-bootstrap";
import errorImage from "../assets/images/error.png";

export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Oops!</h1>
      <Image
        src={errorImage}
        alt="error"
        style={{ maxWidth: "300px", marginTop: "20px" }}
      />
      <p style={{ fontSize: "24px" }}>Page not found...</p>
    </div>
  );
}
