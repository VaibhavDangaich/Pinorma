"use client";

import Link from "next/link";
import TrueFocus from "../ui/components/TrueFocus";
import ScrollVelocity from "../ui/components/ScrollVelocity";

export default function CompanyIntro({ onViewProducts }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-down gap-6">
      <div className=" hidden lg:flex justify-center items-center gap-20 pointer-events-none">
        <p className="text-5xl font-bold p-3 pr-[-100px]">PINORAMA :</p>
        <div className="ml-[-70px]">
          <TrueFocus
            sentence="Elevate Every Surface"
            manualMode={false}
            blurAmount={3}
            borderColor="yellow"
            animationDuration={3}
            pauseBetweenAnimations={1}


          />

        </div>
       
      
      </div>
      <div className="block lg:hidden w-full z-20">
        <ScrollVelocity

          texts={['PINORAMA', 'Elevate Every Surface']}

          velocity={50}

          className="custom-scroll-text z-20"

        />

      </div>
      {/* Cool Enquire Callout */}
      <div className="w-full flex justify-center mb-6">
        <div className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-green-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up animate-pulse px-4 py-2 rounded-lg">
          Click <span className="font-bold text-blue-300">Enquire</span> to connect with us for <span className="text-green-300">premium cleaning essentials</span> at an <span className="text-blue-200">affordable price</span>!
        </div>
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
      <Link href="/products">
        <button
          className="bg-blue-600 text-white px-8 py-3 mb-[100px] hover:scale-110 cursor-pointer duration-300 ease-in-out rounded-full shadow-lg hover:bg-blue-700 transition text-xl font-bold animate-fade-in-up"
          
        >
          View Products

        </button>
      </Link>
      
    </section>
  );
} 