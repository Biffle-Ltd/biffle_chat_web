import React from 'react';
import { CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div
              className="flex items-center space-x-2 mb-4 cursor-pointer"
              onClick={() => onNavigate?.("home")}
            >
              <img
                src={logo}
                alt="Biffle Logo"
                className="h-8 md:w-8"
              />
              <img
                src={logo}
                alt="Biffle Logo"
                className="h-8 md:w-8"
              />
              <span className="text-2xl font-bold">BIFFLE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Biffle.ai connects you with verified experts through premium
              short-form content in a safe, compliant, and engaging digital
              environment.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.("products")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Product And Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("pricing")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Plans & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("creators")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("home")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  For Fans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li> */}
              <li>
                <button
                  onClick={() => onNavigate?.("safety")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Safety & Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("support")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Report an Issue</a></li> */}
              <li>
                <button
                  onClick={() => onNavigate?.("guidelines")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="font-semibold mb-4">Legal & Trust</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <button
                  onClick={() => onNavigate?.("terms")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("privacy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li> */}
              <li>
                <button
                  onClick={() => onNavigate?.("support")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Biffle. All rights reserved.
          </p>
          {/* <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Powered by</span>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Razorpay</span>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">JusPay</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}