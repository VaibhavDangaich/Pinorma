"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CompanyIntro from "./components/CompanyIntro";
import CartSidebar from "./components/CartSidebar";
import EnquiryModal from "./components/EnquiryModal";
import ParticleRing from "./ui/components/ParticleRing";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", message: "" });
  const [enquirySent, setEnquirySent] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Always apply dark mode
  useEffect(() => {
    document.documentElement.classList.add("my-dark");
    return () => document.documentElement.classList.remove("my-dark");
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
  };

  const handleEnquiryChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (res.ok) {
        setEnquirySent(true);
        setTimeout(() => {
          setShowEnquiry(false);
          setEnquirySent(false);
          setEnquiry({ name: "", email: "", message: "" });
        }, 2000);
      } else {
        alert("Failed to send enquiry. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center px-4 overflow-y-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-full bg-repeat opacity-20 z-0 h-full w-full">
        <ParticleRing></ParticleRing>
        <ParticleRing></ParticleRing>
        <ParticleRing></ParticleRing>
      </div>
       
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
        style={{ backgroundImage: 'url(/all_prod.png)' }}
      ></div>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full flex flex-col items-center">
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
        />
        <div className="w-full max-w-4xl mt-24">
          {!showProducts ? (
            <CompanyIntro onViewProducts={() => setShowProducts(true)} />
          ) : (
            <ProductGrid products={products} onAddToCart={addToCart} setProducts={setProducts} />
          )}
        </div>
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
