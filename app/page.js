"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CompanyIntro from "./components/CompanyIntro";
import CartSidebar from "./components/CartSidebar";
import EnquiryModal from "./components/EnquiryModal";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });
  const [enquirySent, setEnquirySent] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("my-dark");
    } else {
      document.documentElement.classList.remove("my-dark");
    }
  }, [isDark]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

  const handleEnquiryChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setShowEnquiry(false);
      setEnquirySent(false);
      setEnquiry({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center px-4 overflow-y-hidden">
      <Navbar
        cartCount={cart.length}
        onEnquireClick={() => setShowEnquiry(true)}
        onCartClick={() => setCartOpen((open) => !open)}
        onHome={() => {
          setShowProducts(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onProducts={() => {
          setShowProducts(true);
          setTimeout(() => {
            const el = document.getElementById("products");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onToggleDark={() => setIsDark((d) => !d)}
        isDark={isDark}
      />
      <div className="w-full max-w-4xl mt-24">
        {!showProducts ? (
          <CompanyIntro onViewProducts={() => setShowProducts(true)} />
        ) : (
          <ProductGrid products={products} onAddToCart={addToCart} setProducts={setProducts} />
        )}
      </div>
      {cartOpen && (
        <CartSidebar cart={cart} onClose={() => setCartOpen(false)} />
      )}
      {showEnquiry && (
        <EnquiryModal
          enquiry={enquiry}
          onChange={handleEnquiryChange}
          onSubmit={handleEnquirySubmit}
          onClose={() => setShowEnquiry(false)}
          enquirySent={enquirySent}
        />
      )}
    </div>
  );
}
