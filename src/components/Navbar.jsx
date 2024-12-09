import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingBag, FiX, FiMenu } from 'react-icons/fi'; // Import hamburger icon
import { useCart } from '../context/context'; // Import the CartContext hook
import { Button } from 'antd'; // Import Button for Buy Now
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import logo from '../assets/logo.png'
import logo2 from '../assets/main-img.jpg'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true); // Tracks visibility of the navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Tracks sidebar visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  // Access cart data from the context
  const { cartItems, totalAmount, totalItems } = useCart();

  // Initialize navigate function
  const navigate = useNavigate();

  // Handle scroll behavior
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Lock the body scroll when the sidebar is open
    if (!isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
    toggleSidebar();
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isSidebarOpen ? 'shadow-lg' : ''}`}
      >
        {/* Top Black Bar */}
        <div className="bg-black text-white text-center text-sm py-2">
          Contact us at <strong>0329 992 2217</strong> (09:00 - 18:00 | Monday - Friday)
        </div>

        {/* Main Navbar */}
        <div className="flex md:flex-row flex-row-reverse justify-between items-center px-6 py-2">
          {/* Left Section: Search Icon */}
          <div className='hidden md:block'>
            <FiSearch className="text-black text-lg" />
          </div>

          <div className="hidden lg:flex justify-center items-center space-x-8 text-sm pb-2 font-medium text-black">
            <a href="#west" className="hover:underline transition pt-6 duration-200">WEST 2024</a>
            <a href="#pret" className="hover:underline transition pt-6 duration-200">PRET</a>
            <a href="#desire" className="hover:underline transition pt-6 duration-200">DESIRE</a>
            <img href='/' src={logo2} alt="" width={100} />
            <a href="#newin" className="hover:underline transition pt-6 duration-200">NEW IN</a>
            <a href="#sale" className="hover:underline transition pt-6 duration-200">SALE</a>
            <a href="#blogs" className="hover:underline transition pt-6 duration-200">BLOGS</a>
          </div>
          {/* Right Section: Cart Icon */}
          <div className="relative" onClick={toggleSidebar}>
            <FiShoppingBag className="text-black text-lg cursor-pointer" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden" onClick={toggleMobileMenu}>
            <FiMenu className="text-black text-lg cursor-pointer" />
          </div>
        </div>

        {/* Links Section - Desktop */}

      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FiX className="text-black text-2xl cursor-pointer" onClick={toggleMobileMenu} />
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col items-center space-y-6 py-10">
          <a href="#west" className="text-lg font-medium text-black">WEST 2024</a>
          <a href="#pret" className="text-lg font-medium text-black">PRET</a>
          <a href="#desire" className="text-lg font-medium text-black">DESIRE</a>
          <a href="#newin" className="text-lg font-medium text-black">NEW IN</a>
          <a href="#sale" className="text-lg font-medium text-black">SALE</a>
          <a href="#blogs" className="text-lg font-medium text-black">BLOGS</a>
        </div>
      </div>

      {/* Overlay (Darkened background) for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Overlay (Darkened background) */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 rounded-l-lg overflow-hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FiX className="text-black text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>

        {/* Cart Content */}
        <div className="p-6 flex flex-col h-full space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div className="overflow-auto flex-grow space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-4 space-x-4">
                  <div className="flex-shrink-0">
                    <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    {item.price * item.quantity} PKR
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-800">Total: {totalAmount} PKR</p>
                {cartItems.length > 0 && (
                  <div className="mt-6 flex-shrink-0">
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleCheckout} // Navigate to checkout
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: 'bold',
                        width: '100%',
                      }}
                    >
                      Checkout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is currently empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
