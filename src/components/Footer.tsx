import React from 'react';
import { MessageCircleHeart, Shield, Award, CheckCircle } from 'lucide-react';

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
              <MessageCircleHeart className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">BIFFLE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The premier creator-fan platform where storytellers connect
              directly with their audience.
            </p>
            <div className="flex space-x-4 mt-4">
              <div className="text-purple-400 hover:text-purple-300 cursor-pointer">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="text-purple-400 hover:text-purple-300 cursor-pointer">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <div className="text-purple-400 hover:text-purple-300 cursor-pointer">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.82.402-.085.402-.284 1.409-.323 1.617-.051.219-.165.265-.381.159-1.33-.608-2.162-2.523-2.162-4.059 0-3.26 2.293-6.257 6.608-6.257 3.466 0 6.159 2.476 6.159 5.764 0 3.442-2.168 6.221-5.182 6.221-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </div>
            </div>
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
                  Terms of Service
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
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">
                  ISO 27001 Certified
                </span>
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