import React from 'react';
import { Users, Heart, Coins, Shield, Star, CheckCircle, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Join the creators' <span className="text-yellow-300">movement</span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed">
                Showcase your talent. Connect with fans. Earn with Biffle coins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('coins')}
                  className="bg-mint-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-mint-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  style={{ backgroundColor: '#27CDB1' }}
                >
                  Buy Coins
                </button>
                <button 
                  onClick={() => onNavigate('creators')}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
                >
                  Become a Creator
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-400/20 rounded-2xl p-4 text-center">
                    <Users className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
                    <p className="text-white font-medium">10K+ Creators</p>
                  </div>
                  <div className="bg-pink-400/20 rounded-2xl p-4 text-center">
                    <Heart className="h-8 w-8 text-pink-300 mx-auto mb-2" />
                    <p className="text-white font-medium">1M+ Connections</p>
                  </div>
                  <div className="bg-green-400/20 rounded-2xl p-4 text-center">
                    <Coins className="h-8 w-8 text-green-300 mx-auto mb-2" />
                    <p className="text-white font-medium">₹5Cr+ Earned</p>
                  </div>
                  <div className="bg-blue-400/20 rounded-2xl p-4 text-center">
                    <Shield className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-white font-medium">100% Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Creators */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Create & Monetise</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Upload stories, host audio calls, and connect directly with your audience. 
                Keep up to 80% of your earnings and build lasting relationships with fans.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Direct fan interactions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Multiple content formats</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Real-time analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Instant payouts</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('creators')}
                className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                Start Creating <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>

            {/* For Fans */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-2xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">Discover & Engage</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse amazing creators, purchase Biffle coins, and enjoy exclusive 
                one-on-one interactions through chats, voice notes, and audio calls.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Exclusive content access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Private conversations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Voice & audio calls</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Safe & secure platform</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigate('coins')}
                className="bg-mint-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
                style={{ backgroundColor: '#27CDB1' }}
              >
                Explore Creators <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How Biffle Coins Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Biffle Coins Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Biffle coins are virtual tokens pegged to the rupee — one coin equals ₹1. 
              Purchase coin packs for better value and start connecting with creators instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Buy Coins</h3>
              <p className="text-gray-600">Choose from multiple coin packages with attractive discounts for bulk purchases.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect with Creators</h3>
              <p className="text-gray-600">Use coins to tip creators, send messages, or book exclusive one-on-one sessions.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Exclusive Interactions</h3>
              <p className="text-gray-600">Experience personalized content, private chats, and direct audio conversations.</p>
            </div>
          </div>

          {/* Coin Packages Preview */}
          <div className="bg-lavender-50 rounded-3xl p-8" style={{ backgroundColor: '#F6F4FF' }}>
            <h3 className="text-2xl font-bold text-center mb-8">Popular Coin Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { coins: 100, price: 99, discount: '1% off', popular: false },
                { coins: 500, price: 450, discount: '10% off', popular: true },
                { coins: 1000, price: 850, discount: '15% off', popular: false },
                { coins: 2500, price: 2000, discount: '20% off', popular: false }
              ].map((pack, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 text-center relative ${pack.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''}`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <Coins className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold text-gray-800">{pack.coins} Coins</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">₹{pack.price}</p>
                  <p className="text-sm text-green-600 font-medium mb-4">{pack.discount}</p>
                  <button 
                    onClick={() => onNavigate('coins')}
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Buy Coins
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Security */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Your safety and security are our top priorities</p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Shield className="h-6 w-6 text-green-500" />
              <span className="font-medium">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="font-medium">4.8★ Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <span className="font-medium">₹5Cr+ Processed</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                role: "Content Creator",
                content: "Biffle helped me monetize my storytelling passion. The direct connection with fans is incredible!",
                rating: 5
              },
              {
                name: "Arjun K.",
                role: "Fan",
                content: "Love the personal interactions with creators. The coin system is transparent and fair.",
                rating: 5
              },
              {
                name: "Meera R.",
                role: "Influencer",
                content: "Best platform for creators! Easy to use, great payouts, and amazing community support.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Partners */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-8">Powered by trusted payment partners</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-blue-600">Razorpay</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-green-600">JusPay</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-purple-600">UPI</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-orange-600">PayTM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}