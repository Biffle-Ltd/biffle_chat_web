import { useEffect, useState } from "react";
import {
  Users,
  Heart,
  Coins,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { apiUri } from "../utility/constants";
import { CountUp } from './ui/externalcomponents';
import playstoreImg from "../assets/playstore.png";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  user_type: "fan" | "creator";
  is_new_user: boolean;
  token: string;
}

interface LandingPageProps {
  onNavigate: (page: string) => void;
  user?: User | null;
}

export default function LandingPage({ onNavigate, user }: LandingPageProps) {
  // Default IDs provided
  const defaultCoinPackIds = {
    starter_packs: ["starter_pack_15"],
    micropacks: ["coin_79", "coin_49", "coin_39", "coin_29", "coin_149"],
    isTrialPack: ["coin_100"],
    isBonusPack: ["coin_2000"],
  };

  // Build placeholder pack objects from IDs for initial display
  const buildPlaceholderPacks = (ids: typeof defaultCoinPackIds) => {
    const flagSet = (arr: string[]) => new Set(arr);
    const trial = flagSet(ids.isTrialPack);
    const bonus = flagSet(ids.isBonusPack);
    const allIds = [
      ...ids.starter_packs,
      ...ids.micropacks,
      ...ids.isTrialPack.filter((id) =>
        !ids.starter_packs.includes(id) && !ids.micropacks.includes(id)
      ),
      ...ids.isBonusPack.filter((id) =>
        !ids.starter_packs.includes(id) && !ids.micropacks.includes(id)
      ),
    ];
    return allIds.map((id) => {
      const numeric = Number((id.match(/(\d+)/) || ["", "0"])[1]);
      return {
        id: `${id}`,
        coin_value: numeric || 0,
        amount: numeric || 0,
        isTrialPack: trial.has(id),
        isBonusPack: bonus.has(id),
        // minimal shape to satisfy UI
      } as any;
    });
  };

  const [coinPacks, setCoinPacks] = useState<any[]>(
    buildPlaceholderPacks(defaultCoinPackIds)
  );
  const [isLoading, setIsLoading] = useState(true);

  // Function to clear authentication data from storage
  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    // Clear cookies if they exist
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Function to validate token and fetch data
  const validateTokenAndFetchData = async () => {
    const token = user ? user.token : localStorage.getItem("authToken");
    
    // If no token present, display dummy data
    if (!token) {
      setCoinPacks(buildPlaceholderPacks(defaultCoinPackIds));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
      `${apiUri}/api/v1/creator_center/details/get-coin-pack-details/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      );

      const data = await response.json();

      // Check if token is valid and API call successful
      if (response.ok && data.success && Array.isArray(data.data)) {
        // Token is valid, display real data
            setCoinPacks(data.data);
      } else {
        // Token is expired or invalid, clear it and display dummy data
        clearAuthData();
        setCoinPacks(buildPlaceholderPacks(defaultCoinPackIds));
      }
    } catch (error) {
      // Network error or other issues, clear token and display dummy data
      console.error("Error fetching coin packs:", error);
      clearAuthData();
      setCoinPacks(buildPlaceholderPacks(defaultCoinPackIds));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateTokenAndFetchData();
  }, [user]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800 min-h-screen flex">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-400/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 space-x-2">
                <span className="text-sm font-medium">🇮🇳 India's #1 Creator Platform</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                Join the Creators'{" "}
                <span className="text-yellow-300 inline-block animate-pulse">Movement</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-xl">
                Showcase your talent. Connect with <span className="text-pink-300 font-semibold">real fans</span>. 
                Earn with <span className="text-yellow-300 font-semibold">Biffle coins</span>.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span className="text-sm">100% Secure</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 space-x-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">Instant Payouts</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">Grow Your Brand</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
                <button
                  onClick={() => onNavigate(user ? "coins" : "login")}
                  className="group bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>{user ? "Buy Coins Now" : "Get Started"}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate("creator-registration")}
                  className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-xl"
                >
                  Become a Creator
                </button>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="relative hidden lg:block">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-pink-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Live Platform Stats</h3>
                  <p className="text-purple-200 text-sm">Real-time metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <Users className="h-10 w-10 text-yellow-300 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-white mb-1">
                      <CountUp from={0} to={100} duration={2} className="inline" />+
                    </p>
                    <p className="text-yellow-100 text-sm">Creators</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-400/20 to-pink-500/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <Heart className="h-10 w-10 text-pink-300 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-white mb-1">
                      <CountUp from={0} to={10} duration={2} className="inline" />K+
                    </p>
                    <p className="text-pink-100 text-sm">Connections</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-400/20 to-green-500/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <Coins className="h-10 w-10 text-green-300 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-white mb-1">
                      ₹<CountUp from={0} to={5} duration={2} className="inline" />L+
                    </p>
                    <p className="text-green-100 text-sm">Earned</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-400/20 to-blue-500/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-blue-300 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-white mb-1">
                      <CountUp from={0} to={100} duration={2} className="inline" />%
                    </p>
                    <p className="text-blue-100 text-sm">Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA (merged into hero) */}
          <div className="mt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="text-white text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    Mobile App Available
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                  Get the Biffle App
                </h2>
                <p className="text-xl text-white/90 mb-6 md:mb-0">
                  Connect with creators on the go. Download now!
                </p>
              </div>

              {/* Right Download Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://biffle-apk.s3.ap-south-1.amazonaws.com/spinoff-app.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white text-gray-900 px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 hover:scale-105"
                >
                  {/* Google Play Store Logo */}
                  <img src={playstoreImg} alt="Google Play" className="h-12 w-12" />
                  <div className="text-left flex-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">GET IT ON</div>
                    <div className="text-2xl font-bold">Google Play</div>
                  </div>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </a>
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
                <h3 className="text-2xl font-bold ml-4 text-gray-800">
                  Create & Monetise
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Upload stories, host audio calls, and connect directly with your
                audience. Keep up to 80% of your earnings and build lasting
                relationships with fans.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Direct fan interactions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Multiple content formats
                  </span>
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
                onClick={() => onNavigate("creator-registration")}
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
                <h3 className="text-2xl font-bold ml-4 text-gray-800">
                  Discover & Engage
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse amazing creators, purchase Biffle coins, and enjoy
                exclusive one-on-one interactions through chats, voice notes,
                and audio calls.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="6flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Exclusive content access
                  </span>
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
                onClick={() => onNavigate("login")}
                className="bg-mint-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
                style={{ backgroundColor: "#27CDB1" }}
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How Biffle Coins Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Biffle coins are virtual tokens pegged to the rupee — one coin
              equals ₹1. Purchase coin packs for better value and start
              connecting with creators instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Buy Coins</h3>
              <p className="text-gray-600">
                Choose from multiple coin packages with attractive discounts for
                bulk purchases.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Connect with Creators
              </h3>
              <p className="text-gray-600">
                Use coins to tip creators, send messages, or book exclusive
                one-on-one sessions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Enjoy Exclusive Interactions
              </h3>
              <p className="text-gray-600">
                Experience personalized content, private chats, and direct audio
                conversations.
              </p>
            </div>
          </div>

          {/* Coin Packages Preview */}
          <div
            className="bg-lavender-50 rounded-3xl p-8"
            style={{ backgroundColor: "#F6F4FF" }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              Popular Coin Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600">Loading coin packages...</span>
                </div>
              ) : coinPacks.length > 0 ? (
                coinPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className={`bg-white rounded-2xl p-6 text-center relative hover:cursor-pointer ${
                      pack.isBonusPack
                        ? "ring-2 ring-purple-500 transform scale-105"
                        : ""
                    }`}
                    onClick={() => onNavigate(user ? "coins" : "login")}
                  >
                    {pack.isBonusPack && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Bonus Pack
                        </span>
                      </div>
                    )}
                    <Coins className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-gray-800">
                      {pack.coin_value} Coins
                    </h4>
                    <p className="text-3xl font-bold text-purple-600 mb-2">
                      ₹{pack.amount}
                    </p>
                    <p className="text-sm text-green-600 font-medium mb-4">
                      {pack.isTrialPack ? "Trial Pack" : ""}
                    </p>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      {user ? "Buy Coins" : "Login"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 mb-4">No coin packages available</p>
                  <button
                    onClick={() => onNavigate("login")}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Login to view packages
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Security */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              Your safety and security are our top priorities
            </p>
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
              <span className="font-medium">4.1★ Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <span className="font-medium">₹5L+ Processed</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                role: "Content Creator",
                content:
                  "Biffle helped me monetize my storytelling passion. The direct connection with fans is incredible!",
                rating: 5,
              },
              {
                name: "Arjun K.",
                role: "Fan",
                content:
                  "Love the personal interactions with creators. The coin system is transparent and fair.",
                rating: 5,
              },
              {
                name: "Meera R.",
                role: "Content Creator",
                content:
                  "Best platform for creators! Easy to use, great payouts, and amazing community support.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Partners */}
          {/* <div className="mt-16 text-center">
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
          </div> */}
        </div>
      </section>
    </div>
  );
}
