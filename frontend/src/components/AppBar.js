import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const AppBar = ({ scrollToFooter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/5 backdrop-blur-lg' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6 py-4  flex justify-between items-center">
        {/* Logo and Title */}
        <Link to={'/'} className="flex items-center space-x-3">
          <img
            src={logo}
            alt="AiPen Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <span className="text-2xl font-bold text-gray-800">
            Ai<span className="text-blue-500">Pen</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/essay-generator" className="hover:text-blue-500 transition">
            Essay Generator
          </Link>
          <button
            onClick={scrollToFooter}
            className="hover:text-blue-500 transition"
          >
            About
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-500 transition"
          onClick={toggleMobileMenu}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="bg-gray-100 md:hidden flex flex-col items-center space-y-4 pb-4 pt-2 text-gray-700 border-t border-gray-200">
          <Link to="/" className="hover:text-blue-500 transition" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/essay-generator" className="hover:text-blue-500 transition" onClick={toggleMobileMenu}>
            Essay Generator
          </Link>
          <button
            onClick={() => {
              scrollToFooter();
              toggleMobileMenu();
            }}
            className="hover:text-blue-500 transition"
          >
            About
          </button>
        </nav>
      )}
    </header>
  );
};

export default AppBar;