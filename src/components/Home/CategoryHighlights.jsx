import React from 'react';
import { Link } from 'react-router-dom';

const CategoryHighlights = () => {
  const categories = [
    {
      id: 1,
      title: 'PRET',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418571/img-5.3_wjpfqn.jpg', // Replace with actual image URL
      link: '/pret', // Link to the specific product category page
    },
    {
      id: 2,
      title: 'OCTA | WEST 2024',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-3.10_r88dmm.jpg', // Replace with actual image URL
      link: '/octa-west-2024', // Link to the specific product category page
    },
    {
      id: 3,
      title: 'MIRHASTUDIO',
      image: 'https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-1.5_mrysyu.jpg', // Replace with actual image URL
      link: '/batikstudio', // Link to the specific product category page
    },
  ];

  return (
    <div className="bg-white py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link} // Use Link to make the card clickable
            className="relative group block"
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300"></div>

            {/* Description Box */}
            <div className="absolute inset-x-0 bottom-[-50px] bg-white text-center px-4 py-6 shadow-md mx-auto w-[80%]">
              <h2 className="text-lg md:text-xl font-semibold text-black mb-2">{category.title}</h2>
              <button className="text-gray-700 border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-200">
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryHighlights;
