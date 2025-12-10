// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import ItemsList from "./components/ItemsList";
import Cart from "./components/Cart";
import "./styles.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <nav>
            <Link to="/">Products</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ItemsList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
