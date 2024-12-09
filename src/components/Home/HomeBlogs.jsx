import React from 'react';

const HomeBlogs = () => {
  const blogs = [
    {
      id: 1,
      image: 'https://via.placeholder.com/400x300', // Replace with actual image URL
      date: 'Oct 29, 2024',
      title:
        'BATIK’s Luxury Festive Pret Collection, A Glamorous Collaboration with Influencers HIRA & HEMAYAL',
      author: 'by Hamnah',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x300', // Replace with actual image URL
      date: 'Oct 10, 2024',
      title:
        'Warm up your Wardrobe: Discover BATIK’s ELENA; Ready-to-Wear Printed Khaddar Edit',
      author: 'by Aleeza',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x300', // Replace with actual image URL
      date: 'Oct 07, 2024',
      title:
        'Style Your Wedding with BATIKstudio’s Shaadi Series: A Fusion of Tradition and Modern Elegance!',
      author: 'by Hamnah',
    },
  ];

  return (
    <div className="bg-white py-16 px-6 md:px-20">
      {/* Section Heading */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-semibold text-black">OUR BLOGS</h2>
        <button className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition">
          View All
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="group">
            {/* Blog Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Blog Info */}
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">{blog.date}</p>
              <h3 className="text-lg font-medium text-black mt-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{blog.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBlogs;
