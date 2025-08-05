import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Phone, 
  BarChart3, 
  Wallet, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

interface CreatorLandingProps {
  onNavigate: (page: string) => void;
}

export default function CreatorLanding({ onNavigate }: CreatorLandingProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Turn Your Passion Into <span className="text-yellow-300">Profit</span>
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join thousands of creators earning money by sharing stories, hosting conversations, 
              and building meaningful connections with fans on Biffle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('creator-registration')}
                className="bg-mint-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-mint-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#27CDB1' }}
              >
                Become a Creator
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">₹5L+</div>
              <div className="text-gray-600">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">4.1★</div>
              <div className="text-gray-600">Creator Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and features designed specifically for creators to monetize their content and grow their audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Content Sharing */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-2xl w-fit mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Multi-Format Content</h3>
              <p className="text-gray-600 mb-4">Share stories, audio posts, images, and videos. Multiple formats to express your creativity.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Text stories & blogs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Audio recordings
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Image galleries
                </li>
              </ul>
            </div>

            {/* Direct Messaging */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-2xl w-fit mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">1:1 Messaging</h3>
              <p className="text-gray-600 mb-4">Connect directly with fans through private text messages and voice notes.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Private text chats
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Voice message replies
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Photo sharing
                </li>
              </ul>
            </div>

            {/* Audio Calls */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl w-fit mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Audio Calls</h3>
              <p className="text-gray-600 mb-4">Host premium one-on-one audio calls with your most dedicated fans.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Scheduled call slots
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Premium pricing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Call recordings option
                </li>
              </ul>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl w-fit mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Real-time Analytics</h3>
              <p className="text-gray-600 mb-4">Track your performance with detailed insights and engagement metrics.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Earnings dashboard
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Fan engagement stats
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Content performance
                </li>
              </ul>
            </div>

            {/* Earnings */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-2xl w-fit mb-6">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Payouts</h3>
              <p className="text-gray-600 mb-4">Keep 80% of your earnings with instant withdrawal to your bank account.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  80% revenue share
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Daily withdrawals
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Multiple payout methods
                </li>
              </ul>
            </div>

            {/* Growth Tools */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl w-fit mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Growth Tools</h3>
              <p className="text-gray-600 mb-4">Built-in tools to help you discover new fans and grow your audience.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Featured creator spots
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Cross-promotion opportunities
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  SEO-optimized profiles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-gray-600">Simple onboarding process to get you earning quickly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Create Account",
                description: "Sign up with your phone number and verify your identity",
                icon: Users
              },
              {
                step: 2,
                title: "Set Up Profile",
                description: "Add your bio, photos, and showcase your talents",
                icon: Star
              },
              {
                step: 3,
                title: "Start Sharing",
                description: "Upload your first story, audio, or content piece",
                icon: Zap
              },
              {
                step: 4,
                title: "Earn Coins",
                description: "Fans tip you and book interactions, you earn money",
                icon: TrendingUp
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 3 && (
                  <ArrowRight className="h-6 w-6 text-gray-300 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-lavender-50" style={{ backgroundColor: '#F6F4FF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Creator Success Stories</h2>
            <p className="text-xl text-gray-600">See how creators are earning on Biffle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Storyteller Sarah",
                category: "Fiction Writer",
                earnings: "₹45,000/month",
                content: "I share daily short stories and my fans love the personal touch. The audio calls have been amazing!",
                avatar: "👩‍💼"
              },
              {
                name: "Podcast Raj",
                category: "Audio Creator",
                earnings: "₹80,000/month",
                content: "Started with simple voice notes, now I'm hosting premium calls. Biffle changed my life!",
                avatar: "🎙️"
              },
              {
                name: "Comedy Priya",
                category: "Entertainer",
                earnings: "₹60,000/month",
                content: "My fans love my daily comedy skits. The direct feedback makes creating so much more fun.",
                avatar: "🎭"
              }
            ].map((creator, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-4 text-center">{creator.avatar}</div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg">{creator.name}</h3>
                  <p className="text-gray-600 text-sm">{creator.category}</p>
                  <p className="text-purple-600 font-bold text-lg">{creator.earnings}</p>
                </div>
                <p className="text-gray-600 italic text-center">"{creator.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators who are already monetizing their passion on Biffle
          </p>
          <button 
            onClick={() => onNavigate('creator-registration')}
            className="bg-mint-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-mint-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            style={{ backgroundColor: '#27CDB1' }}
          >
            Become a Creator Today
          </button>
          <p className="text-purple-200 text-sm mt-4">
            Free to join • Start earning immediately • 80% revenue share
          </p>
        </div>
      </section>
    </div>
  );
}