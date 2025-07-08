"use client";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: "" });
  const [tab, setTab] = useState("products");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authed) {
      fetchProducts();
      fetchEnquiries();
    }
  }, [authed]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };
  const fetchEnquiries = async () => {
    const res = await fetch("/api/enquiries");
    setEnquiries(await res.json());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price),
      }),
    });
    if (res.ok) {
      setNewProduct({ name: "", description: "", price: "", image: "" });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-xs">
          <h2 className="text-2xl font-bold text-green-900 mb-2 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-3 py-2 placeholder-gray-500"
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-900">
        <div className="flex gap-4 mb-6">
          <button className={`px-4 py-2 rounded ${tab === "products" ? "bg-blue-600 text-white" : "bg-gray-100"}`} onClick={() => setTab("products")}>Products</button>
          <button className={`px-4 py-2 rounded ${tab === "enquiries" ? "bg-blue-600 text-white" : "bg-gray-100"}`} onClick={() => setTab("enquiries")}>Enquiries</button>
        </div>
        {tab === "products" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-900">Manage Products</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-2 mb-6">
              <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="border rounded px-3 py-2" required />
              <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border rounded px-3 py-2" required />
              <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="border rounded px-3 py-2" required />
              <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="border rounded px-3 py-2" required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Product</button>
            </form>
            <ul className="divide-y">
              {products.map((p) => (
                <li key={p._id} className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-semibold text-green-900">{p.name}</div>
                    <div className="text-sm text-gray-700">{p.description}</div>
                    <div className="text-green-700 font-bold">₹{p.price}</div>
                  </div>
                  <button onClick={() => handleDeleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}
        {tab === "enquiries" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-900">Enquiries</h2>
            <ul className="divide-y">
              {enquiries.map((e) => (
                <li key={e._id} className="py-2">
                  <div className="font-semibold text-green-900">{e.name} ({e.email})</div>
                  <div className="text-gray-900">{e.message}</div>
                  <div className="text-xs text-gray-600">{new Date(e.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
} 