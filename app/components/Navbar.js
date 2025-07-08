"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ cartCount, onEnquireClick, onCartClick, onHome, onProducts, onToggleDark, isDark }) {
  const router = useRouter();
  return (
    <nav className="w-full fixed left-0 top-0 z-30 bg-white/80 dark:bg-black/70 backdrop-blur shadow flex items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center gap-2 cursor-pointer" prefetch={false}>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-green-700 via-blue-500 to-green-400 bg-clip-text text-transparent animate-fade-in-down">Pinorma</span>
      </Link>
      <div className="hidden sm:flex gap-6 items-center text-gray-900 font-semibold">
        <button onClick={onHome} className="hover:text-blue-700 transition">Home</button>
        <button onClick={onProducts} className="hover:text-blue-700 transition">Products</button>
        <button onClick={onEnquireClick} className="hover:text-blue-700 transition">Enquire</button>
        <div className="relative cursor-pointer" onClick={onCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017m0 0l1.35 5.054m-.272-1.017h12.208c.893 0 1.515.868 1.304 1.736l-1.273 5.09a1.125 1.125 0 01-1.087.836H7.386a1.125 1.125 0 01-1.087-.836l-1.35-5.054zm0 0L5.25 6.75m0 0V5.25A2.25 2.25 0 017.5 3h9.75a2.25 2.25 0 012.25 2.25v1.5" />
            <circle cx="8.5" cy="19" r="1.5" />
            <circle cx="17.5" cy="19" r="1.5" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </div>
        <Link href="/admin" className="ml-4 px-4 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Admin</Link>
        <button
          onClick={onToggleDark}
          className="ml-4 px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 0H3m15.364-6.364l-1.06 1.06m-12.728 0l-1.06-1.06m12.728 12.728l-1.06-1.06m-12.728 0l-1.06 1.06M16.24 7.76A6 6 0 117.76 16.24 6 6 0 0116.24 7.76z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75a9.75 9.75 0 010-19.5c.414 0 .75.336.75.75v.75a7.5 7.5 0 007.5 7.5h.75c.414 0 .75.336.75.75a9.718 9.718 0 01-2.248 6.002z" />
            </svg>
          )}
        </button>
      </div>
      <div className="sm:hidden flex items-center">
        <div className="relative cursor-pointer" onClick={onCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017m0 0l1.35 5.054m-.272-1.017h12.208c.893 0 1.515.868 1.304 1.736l-1.273 5.09a1.125 1.125 0 01-1.087.836H7.386a1.125 1.125 0 01-1.087-.836l-1.35-5.054zm0 0L5.25 6.75m0 0V5.25A2.25 2.25 0 017.5 3h9.75a2.25 2.25 0 012.25 2.25v1.5" />
            <circle cx="8.5" cy="19" r="1.5" />
            <circle cx="17.5" cy="19" r="1.5" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </div>
      </div>
    </nav>
  );
} 