import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gray-100 h-[500px] flex items-center justify-center">
      {/* Background Placeholder Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x500/cccccc/ffffff')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
          Elegance Redefined
        </h1>
        <p className="text-lg md:text-xl font-light mb-6">
          Discover our timeless winter collection
        </p>
        <button className="bg-white text-black font-medium px-6 py-3 rounded-md hover:bg-gray-200 transition duration-200 shadow-md">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
