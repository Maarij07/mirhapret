import React from 'react';

const TopPicks = () => {
  const topPicks = [
    {
      id: 1,
      name: 'Armish 3Pc - Printed Khaddar Dress',
      price: 'PKR 8,990',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-5.4_nsaure.jpg', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Scarlet 2Pc - Printed Khaddar Dress',
      price: 'PKR 5,490',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.8_wxrh7v.jpg', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'Joy 3Pc - Printed Khaddar Dress',
      price: 'PKR 10,990',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-4.4_fascoc.jpg', // Replace with actual image URL
    },
    {
      id: 4,
      name: 'Bella 2Pc - Printed Khaddar Dress',
      price: 'PKR 5,490',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.12_g11q5x.jpg', // Replace with actual image URL
    },
  ];

  return (
    <div className="bg-[#F5F5F5] py-16 px-6 md:px-20">
      {/* Section Heading */}
      <h2 className="text-center text-3xl font-semibold text-black mb-12">
        EXPLORE TOP PICKS
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {topPicks.map((item) => (
          <div key={item.id} className="group">
            {/* Product Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[400px] object-cover"
              />

              {/* Quick View Button (At Bottom) */}
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full py-3 text-white text-sm font-medium">
                  Quick view
                </button>
              </div>
            </div>

            {/* Product Info (Outside Box) */}
            <div className="text-center mt-4">
              <h3 className="text-sm text-black font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
