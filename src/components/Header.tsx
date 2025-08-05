import React, { useState } from 'react';
import { MessageCircleHeart, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  user?: any;
  onLogout?: () => void;
}

export default function Header({ currentPage = 'home', onNavigate, user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate?.(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="relative">
              <MessageCircleHeart className="h-8 w-8 text-purple-600" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              BIFFLE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('creators')}
              className={`transition-colors ${currentPage === 'creators' ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600'}`}
            >
              Creators
            </button>
            <button 
              onClick={() => handleNavigation('safety')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Safety & Compliance
            </button>
            <button 
              onClick={() => handleNavigation('support')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Support
            </button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigation('coins')}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Buy Coins
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Hi, {user.name || 'User'}</span>
                  <button 
                    onClick={onLogout}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation('login')}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Login
              </button>
            )}
            <button 
              onClick={() => handleNavigation('creator-registration')}
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              Become a Creator
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-left text-gray-600 hover:text-purple-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('creators')}
                className="text-left text-gray-600 hover:text-purple-600 transition-colors"
              >
                Creators
              </button>
              <button 
                onClick={() => handleNavigation('safety')}
                className="text-left text-gray-600 hover:text-purple-600 transition-colors"
              >
                Safety & Compliance
              </button>
              <button 
                onClick={() => handleNavigation('support')}
                className="text-left text-gray-600 hover:text-purple-600 transition-colors"
              >
                Support
              </button>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleNavigation('coins')}
                      className="text-left text-purple-600 font-medium"
                    >
                      Buy Coins
                    </button>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Hi, {user.name || 'User'}</span>
                      <button 
                        onClick={onLogout}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleNavigation('login')}
                    className="text-left text-purple-600 font-medium"
                  >
                    Login
                  </button>
                )}
                <button 
                  onClick={() => handleNavigation('creator-registration')}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-2 rounded-full font-medium w-fit"
                >
                  Become a Creator
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}