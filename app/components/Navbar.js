"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import AnimatedHamburgerButton from "../ui/components/AnimatedHamburgerButton.jsx";

export default function Navbar({ cartCount, onEnquireClick, onCartClick, onHome, onProducts }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar content for mobile
  const sidebar = (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
      {/* Sidebar */}
      <div className="fixed top-0 right-0 w-64 h-full shadow-2xl pt-20 px-6 py-8 flex flex-col gap-6 items-center justify-start rounded-l-2xl animate-fade-in-down border-l border-white/20 z-50 bg-[#18181b]/50 backdrop-blur-xl text-white">
        <button className="absolute top-6 right-6 text-gray-300 hover:text-white text-3xl z-10" onClick={() => setSidebarOpen(false)}>&times;</button>
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-green-700 via-blue-500 to-green-400 bg-clip-text text-transparent mb-4" onClick={() => setSidebarOpen(false)}>Pinorma</Link>
        <button onClick={() => { setSidebarOpen(false); onHome(); }} className="text-left text-lg text-gray-100 hover:text-blue-400 transition w-full">Home</button>
        <button onClick={() => { setSidebarOpen(false); onProducts(); }} className="text-left text-lg text-gray-100 hover:text-blue-400 transition w-full">Products</button>
        <button onClick={() => { setSidebarOpen(false); onEnquireClick(); }} className="text-left text-lg text-gray-100 hover:text-blue-400 transition w-full">Enquire</button>
        <div className="relative cursor-pointer w-full" onClick={() => { setSidebarOpen(false); onCartClick(); }}>
          <span className="text-lg text-gray-100">Cart</span>
          {cartCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </div>
        <Link href="/admin" className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition mt-4 w-full text-center" onClick={() => setSidebarOpen(false)}>Admin</Link>
      </div>
    </div>
  );

  return (
    <nav className="w-full fixed left-0 top-0 z-30 bg-white/80 dark:bg-black/70 backdrop-blur shadow flex items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center gap-2 cursor-pointer" prefetch={false}>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-green-700 via-blue-500 to-green-400 bg-clip-text text-transparent animate-fade-in-down">Pinorma</span>
      </Link>
      {/* Large screen nav */}
      <div className="hidden sm:flex gap-6 items-center text-gray-900 font-semibold">
        <button onClick={onHome} className="hover:text-blue-700 transition">Home</button>
        <button onClick={onProducts} className="hover:text-blue-700 transition">Products</button>
        <button onClick={onEnquireClick} className="hover:text-blue-700 transition">Enquire</button>
        <div className="relative cursor-pointer" onClick={onCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-7 h-7 align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017m0 0l1.35 5.054m-.272-1.017h12.208c.893 0 1.515.868 1.304 1.736l-1.273 5.09a1.125 1.125 0 01-1.087.836H7.386a1.125 1.125 0 01-1.087-.836l-1.35-5.054zm0 0L5.25 6.75m0 0V5.25A2.25 2.25 0 017.5 3h9.75a2.25 2.25 0 012.25 2.25v1.5" />
            <circle cx="8.5" cy="19" r="1.5" />
            <circle cx="17.5" cy="19" r="1.5" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </div>
        <Link href="/admin" className="ml-4 px-4 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Admin</Link>
      </div>
      {/* Hamburger for small screens */}
      <div className="sm:hidden flex items-center">
        <AnimatedHamburgerButton isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      {sidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          {/* Sidebar */}
          <div className="sm:hidden fixed top-0 right-0 w-64 h-full min-h-screen shadow-2xl pt-20 px-6 py-8 flex flex-col gap-6 items-center justify-start rounded-l-2xl animate-fade-in-down border-l border-white/20 z-50 bg-[#18181b]/30 backdrop-blur-xl text-white overflow-y-auto">
            <button className="absolute top-6 right-6 text-gray-300 hover:text-white text-3xl z-10" onClick={() => setSidebarOpen(false)}>&times;</button>
            <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-green-700 via-blue-500 to-green-400 bg-clip-text text-transparent mb-4" onClick={() => setSidebarOpen(false)}>Pinorma</Link>
            <button onClick={() => { setSidebarOpen(false); onHome(); }} className="text-left text-lg text-gray-100 z-50 hover:text-blue-400 transition w-full">Home</button>
            <button onClick={() => { setSidebarOpen(false); onProducts(); }} className="text-left text-lg text-gray-100 hover:text-blue-400 transition w-full">Products</button>
            <button onClick={() => { setSidebarOpen(false); onEnquireClick(); }} className="text-left text-lg text-gray-100 hover:text-blue-400 transition w-full">Enquire</button>
            <div className="relative cursor-pointer w-full" onClick={() => { setSidebarOpen(false); onCartClick(); }}>
              <span className="hidden text-lg text-gray-100">Cart</span>
              {cartCount > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
              )}
            </div>
            <Link href="/admin" className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition mt-4 w-full text-center" onClick={() => setSidebarOpen(false)}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 