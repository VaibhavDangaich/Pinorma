"use client";
export default function ProductGrid({ products, onAddToCart }) {
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
          <div key={product.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold text-green-900 mb-1">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2 text-center">{product.description}</p>
            <div className="text-green-700 font-bold mb-2">₹{product.price}</div>
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </>
  );
} 