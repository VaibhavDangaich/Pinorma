"use client";
import { useState } from "react";

export default function ProductGrid({ products, onAddToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product._id];
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    
    const productWithSize = {
      ...product,
      selectedSize: selectedSize,
      price: selectedSize.price,
      displayName: `${product.name} (${selectedSize.size})`
    };
    
    onAddToCart(productWithSize);
  };

  return (
    <>
      <header className="flex flex-col items-center mb-8 animate-fade-in-down">
        <h1
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-700 via-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-2"
          style={{ animation: 'fadeInDown 1s cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          Pinorma Products
        </h1>
        <p
          className="text-xl sm:text-2xl text-gray-700 font-medium mb-4 text-center animate-fade-in-up"
          style={{ animation: 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          Explore our full range of cleaning essentials below.
        </p>
      </header>
      <main id="products" className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in-up">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-between min-h-[400px]">
            <div className="flex flex-col items-center w-full">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold text-green-900 mb-1 text-center">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 text-center">{product.description}</p>
            </div>
            
            <div className="flex flex-col items-center w-full mt-auto">
              {/* Size Selection */}
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Size:</label>
                <select 
                  value={selectedSizes[product._id]?.size || ""} 
                  onChange={(e) => {
                    const selectedSize = product.sizes.find(s => s.size === e.target.value);
                    handleSizeSelect(product._id, selectedSize);
                  }}
                  className="w-full border rounded px-3 py-1 text-sm"
                >
                  <option value="">Choose size...</option>
                  {product.sizes && product.sizes.map((size, index) => (
                    <option key={index} value={size.size}>
                      {size.size} - ₹{size.price}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Display */}
              {selectedSizes[product._id] && (
                <div className="text-green-700 font-bold mb-2 text-lg">
                  ₹{selectedSizes[product._id].price}
                </div>
              )}
              
              <button
                className={`px-4 py-1 rounded transition ${
                  selectedSizes[product._id] 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => handleAddToCart(product)}
                disabled={!selectedSizes[product._id]}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
} 