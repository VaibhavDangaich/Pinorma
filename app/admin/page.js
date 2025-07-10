"use client";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    description: "", 
    image: "",
    category: "General",
    sizes: [{ size: "", price: "" }]
  });
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

  const addSize = () => {
    setNewProduct(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: "" }]
    }));
  };

  const removeSize = (index) => {
    setNewProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const updateSize = (index, field, value) => {
    setNewProduct(prev => ({
      ...prev,
      sizes: prev.sizes.map((size, i) => 
        i === index ? { ...size, [field]: value } : size
      )
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    // Validate sizes
    const validSizes = newProduct.sizes.filter(size => 
      size.size.trim() && size.price && size.price > 0
    );
    
    if (validSizes.length === 0) {
      setError("At least one size with price is required");
      return;
    }

    const productData = {
      ...newProduct,
      sizes: validSizes.map(size => ({
        size: size.size,
        price: Number(size.price)
      }))
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      
      console.log('Response status:', res.status);
      const responseText = await res.text();
      console.log('Response text:', responseText);
      
      if (res.ok) {
        setNewProduct({ 
          name: "", 
          description: "", 
          image: "",
          category: "General",
          sizes: [{ size: "", price: "" }]
        });
        setError("");
        fetchProducts();
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: responseText };
        }
        console.error('API Error:', errorData);
        setError(errorData.error || errorData.details || "Failed to add product");
      }
    } catch (error) {
      console.error('Network error:', error);
      setError("Network error. Please try again.");
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
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-900">
        <div className="flex gap-4 mb-6">
          <button className={`px-4 py-2 rounded ${tab === "products" ? "bg-blue-600 text-white" : "bg-gray-100"}`} onClick={() => setTab("products")}>Products</button>
          <button className={`px-4 py-2 rounded ${tab === "enquiries" ? "bg-blue-600 text-white" : "bg-gray-100"}`} onClick={() => setTab("enquiries")}>Enquiries</button>
        </div>
        
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        
        {tab === "products" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-900">Manage Products</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Product Name" 
                value={newProduct.name} 
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} 
                className="border rounded px-3 py-2" 
                required 
              />
              <input 
                type="text" 
                placeholder="Description" 
                value={newProduct.description} 
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} 
                className="border rounded px-3 py-2" 
                required 
              />
              <input 
                type="text" 
                placeholder="Image URL" 
                value={newProduct.image} 
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} 
                className="border rounded px-3 py-2" 
                required 
              />
              <input 
                type="text" 
                placeholder="Category (optional)" 
                value={newProduct.category} 
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} 
                className="border rounded px-3 py-2" 
              />
              
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-3">Sizes & Prices</h3>
                {newProduct.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      placeholder="Size (e.g., 500ml)" 
                      value={size.size} 
                      onChange={e => updateSize(index, 'size', e.target.value)} 
                      className="border rounded px-3 py-2 flex-1" 
                    />
                    <input 
                      type="number" 
                      placeholder="Price" 
                      value={size.price} 
                      onChange={e => updateSize(index, 'price', e.target.value)} 
                      className="border rounded px-3 py-2 w-24" 
                    />
                    {newProduct.sizes.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeSize(index)} 
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addSize} 
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  + Add Size
                </button>
              </div>
              
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Product</button>
            </form>
            
            <ul className="divide-y">
              {products.map((p) => (
                <li key={p._id} className="flex justify-between items-start py-4">
                  <div className="flex-1">
                    <div className="font-semibold text-green-900">{p.name}</div>
                    <div className="text-sm text-gray-700">{p.description}</div>
                    <div className="text-sm text-gray-600">Category: {p.category}</div>
                    <div className="mt-2">
                      {p.sizes && p.sizes.map((size, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-green-700 font-bold">{size.size}: ₹{size.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-4">Delete</button>
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