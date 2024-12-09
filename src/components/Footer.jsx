import React from 'react';
import { FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { SiThreads } from 'react-icons/si'; // Threads icon from React Icons

const Footer = () => {
  return (
    <div className="bg-[#F5F5F5] py-10 px-8 md:px-20">
      {/* Links Section */}
      <div className="flex flex-col md:flex-row justify-between items-start text-sm text-gray-700 mb-6">
        {/* Column 1 */}
        <div className="mb-6 md:mb-0">
          <ul className="space-y-2 text-left">
            <li className="hover:underline cursor-pointer">About us</li>
            <li className="hover:underline cursor-pointer">Store Locator</li>
            <li className="hover:underline cursor-pointer">FAQ's</li>
            <li className="hover:underline cursor-pointer">Contact us</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="mb-6 md:mb-0">
          <ul className="space-y-2 text-left">
            <li className="hover:underline cursor-pointer">Shipping, Payments & Delivery</li>
            <li className="hover:underline cursor-pointer">Exchange & Return Policy</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="w-full md:w-auto">
          <h4 className="text-left text-black font-medium mb-4">SUBSCRIBE</h4>
          <div className="flex items-center border-b border-black pb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#F5F5F5] text-gray-700 text-sm outline-none"
            />
            <button>
              <FiMail className="text-black text-lg" />
            </button>
          </div>
          {/* Social Icons */}
          <div className="flex justify-start space-x-4 mt-4">
            <a
              href="https://www.facebook.com/mirhapret" // Replace with your Facebook link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FiFacebook className="text-black text-lg cursor-pointer" />
            </a>
            <a
              href="https://twitter.com" // Replace with your Twitter link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FiTwitter className="text-black text-lg cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/mirhapret_official" // Replace with your Instagram link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram className="text-black text-lg cursor-pointer" />
            </a>
            <a
              href="https://threads.net" // Replace with your Threads link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
            >
              <SiThreads className="text-black text-lg cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-600 text-sm mt-6">
        Copyright © {new Date().getFullYear()} MirhaPret. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
