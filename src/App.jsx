import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import MainLayout from "./components/layouts/MainLayout";
import Footer from "./components/Footer";
import AdminLayout from "./components/layouts/AdminLayout";
import Add from "./pages/admin/Add";
import List from "./pages/admin/List";
import Orderss from "./pages/admin/Orderss";
import Error404 from "./components/Error404";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/*  Protected Routes */}
            <Route
              path="/product/:productId"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/place-order"
              element={
                <ProtectedRoute>
                  <PlaceOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="*" element={<Error404 />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/add" element={<Add />} />
            <Route path="/admin/list" element={<List />} />
            <Route path="/admin/orders" element={<Orderss />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
