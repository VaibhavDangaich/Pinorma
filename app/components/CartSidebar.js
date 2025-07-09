"use client";
export default function CartSidebar({ cart, onClose }) {
  return (
    <aside className="fixed right-4 mt-24 bg-white shadow-lg rounded-xl p-4 w-64 z-40 border border-green-100 animate-fade-in-down">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={onClose}>&times;</button>
      <h3 className="font-bold text-lg mb-2 text-green-800">Cart</h3>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-sm">Cart is empty</div>
      ) : (
        <ul className="mb-2">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm mb-1">
              <span className="text-green-900">{item.name}</span>
              <span className="text-gray-800">₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="font-semibold text-green-700">Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Checkout</button>
    </aside>
  );
} 