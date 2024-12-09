import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Carousel, Button } from 'antd';
import ProductCard from './ProductCard';  // Import the reusable ProductCard component

const ProductDescription = () => {
  const location = useLocation();
  const { product } = location.state;  // Retrieve product data passed from the ProductCard

  return (
    <div className="product-description-container pt-[22vh]">
      <div className="container mx-auto px-6 py-12">
        {/* Product Section */}
        <Row gutter={32} align="middle">
          {/* Left Side: Product Images */}
          <Col xs={24} sm={12} md={10}>
            <Carousel autoplay>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      height: '500px',
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          {/* Right Side: Product Info */}
          <Col xs={24} sm={12} md={14}>
            <div className="product-info">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{product.price}</p>
              <p className="text-lg text-gray-800 mb-6">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Size</h4>
                <p>{product.sizes.join(', ')}</p>
              </div>

              {/* Material */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Material</h4>
                <p>{product.material}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8">
                <Button type="primary" size="large" block style={{ backgroundColor: '#000', borderColor: '#000' }}>
                  Add to Cart
                </Button>
                <Button
                  type="default"
                  size="large"
                  block
                  style={{ marginTop: '12px' }}
                  onClick={() => console.log('Proceed to Checkout')}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <Row gutter={[16, 24]}>
            {/* Display related products using the ProductCard component */}
            {[...Array(4)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <ProductCard product={{ 
                  name: 'Sample Product',
                  price: '$99.99',
                  images: ['https://via.placeholder.com/300x400'],
                  sizes: ['S', 'M', 'L'],
                  material: 'Cotton',
                  description: 'Sample description for the related product.',
                }} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
