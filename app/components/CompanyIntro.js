"use client";

import TrueFocus from "../ui/components/TrueFocus";
export default function CompanyIntro({ onViewProducts }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-down gap-6">
      <div className="flex justify-center items-center gap-20">
        <p className="text-5xl font-bold p-4">PINORMA :</p>
        <TrueFocus
          sentence="Elevate Every Surface"
          manualMode={false}
          blurAmount={3}
          borderColor="yellow"
          animationDuration={3}
          pauseBetweenAnimations={1}
        />

      </div>
     
      <div className="flex flex-wrap gap-6 justify-center w-full max-w-3xl">
        <div className="backdrop-blur bg-white/30 rounded-xl hover:scale-110 transition-all duration-300 ease-in-out shadow-lg p-6 min-w-[250px] flex-1">
          <h2 className="text-xl font-bold text-green-900 mb-2">Who We Are</h2>
          <p className="text-gray-800">Pinorma is your trusted wholesale and retail distributor of premium cleaning essentials.</p>
        </div>
        <div className="backdrop-blur bg-white/30 rounded-xl hover:scale-110 transition-all duration-300 ease-in-out shadow-lg p-6 min-w-[250px] flex-1">
          <h2 className="text-xl font-bold text-green-900 mb-2">Our Products</h2>
          <p className="text-gray-800">We offer floor cleaners, handwash, phenyl, toilet cleaners, glass cleaners, dishwash liquid, surface sanitizers, laundry detergents, and room fresheners.</p>
        </div>
        <div className="backdrop-blur hover:scale-110 transition-all duration-300 ease-in-out bg-white/30 rounded-xl shadow-lg p-6 min-w-[250px] flex-1">
          <h2 className="text-xl font-bold text-green-900 mb-2">Why Choose Us?</h2>
          <p className="text-gray-800">Elevate your hygiene standards with our quality products, fast delivery, and trusted service for both businesses and consumers.</p>
        </div>
      </div>
      <ul className="mb-6 text-lg text-green-900 animate-fade-in-up flex flex-wrap gap-4 justify-center">
        <li className="bg-white/80 rounded-full px-4 py-2 shadow font-semibold">Wholesale & Retail</li>
        <li className="bg-white/80 rounded-full px-4 py-2 shadow font-semibold">Premium Cleaning Products</li>
        <li className="bg-white/80 rounded-full px-4 py-2 shadow font-semibold">Fast Delivery</li>
        <li className="bg-white/80 rounded-full px-4 py-2 shadow font-semibold">Trusted by Businesses</li>
      </ul>
      <button
        className="bg-blue-600 text-white px-8 py-3 hover:scale-110 cursor-pointer duration-300 ease-in-out rounded-full shadow-lg hover:bg-blue-700 transition text-xl font-bold animate-fade-in-up"
        onClick={onViewProducts}
      >
        View Products
      </button>
    </section>
  );
} 