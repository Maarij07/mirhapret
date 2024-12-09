import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import ProductDescription from './components/Products/ProductDescription';
import { FiMessageCircle } from 'react-icons/fi'; // Importing an icon for WhatsApp

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pret" element={<Products />} />
        <Route path="/octa-west-2024" element={<Products />} />
        <Route path="/batikstudio" element={<Products />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/productDescription" element={<ProductDescription />} />
      </Routes>
      <Footer />

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/923244577066"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition"
        aria-label="Chat on WhatsApp"
      >
        <FiMessageCircle size={24} />
      </a>
    </Router>
  );
}

export default App;
