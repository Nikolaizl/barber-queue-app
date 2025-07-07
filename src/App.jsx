import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerView from "./pages/CustomerView";
import AdminView from "./pages/AdminView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerView />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
