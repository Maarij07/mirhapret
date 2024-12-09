import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();  // Access the React Router navigate function

  const handleQuickViewClick = () => {
    navigate('/productDescription', {
      state: { product }  // Pass the product data using the 'state' property
    });
  };

  return (
    <div className="relative bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      {/* Product Image */}
      <div className="relative h-[72vh] bg-gray-200 rounded-t-sm">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-sm"
        />

        {/* Hover Effect: Quick View Button */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-sm">
          <Button
            type="primary"
            size="large"
            onClick={handleQuickViewClick}
            block
            style={{ backgroundColor: '#000', borderColor: '#000' }}
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-lg text-gray-600">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
