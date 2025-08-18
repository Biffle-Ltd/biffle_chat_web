import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Coins,
  Tag,
  ShoppingCart,
  Shield,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { apiUri } from "../utility/constants";

interface CoinPackagesProps {
  onNavigate: (page: string) => void;
  onPackageSelect: (pkg: any) => void;
  user: any;
}

export default function CoinPackages({
  onNavigate,
  onPackageSelect,
  user,
}: CoinPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [coinPacks, setCoinPacks] = useState<any[]>([]);

  useEffect(() => {
    const token = user ? user.token : localStorage.getItem("authToken");
    fetch(`${apiUri}/api/v1/creator_center/details/get-coin-pack-details/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) setCoinPacks(data.data);
      });

    // Fetch wallet balance
    fetch(`${apiUri}/api/v1/user_center/details/get-wallet-balance/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.user_wallet) {
          setWalletBalance(data.data.user_wallet.balance);
        }
      });
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "PCI DSS Verified",
      description: "Bank-grade security for all transactions",
    },
    {
      icon: CheckCircle,
      title: "Safe & Secure Payments",
      description: "SSL encryption and fraud protection",
    },
    {
      icon: TrendingUp,
      title: "₹10k+ Processed",
      description: "Trusted by millions of users nationwide",
    },
    {
      icon: Star,
      title: "4.1★ User Rating",
      description: "Highly rated for security and ease of use",
    },
  ];

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg.id);
    onPackageSelect(pkg);
  };

  const handleBuyNow = () => {
    if (selectedPackage) {
      onNavigate("payment-summary");
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Buy Coins</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Why Choose Biffle?
              </h2>

              {/* Current Balance */}
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-4 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">
                      Current Coin Balance
                    </p>
                    <p className="text-2xl font-bold">{walletBalance} coins</p>
                  </div>
                  <Coins className="h-8 w-8 text-purple-200" />
                </div>
              </div>

              {/* Benefits Carousel */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl transition-all duration-500 ${
                      index === currentBenefit
                        ? "bg-purple-50 border-2 border-purple-200 transform scale-105"
                        : "bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-xl ${
                          index === currentBenefit
                            ? "bg-purple-600 text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        <benefit.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold text-sm ${
                            index === currentBenefit
                              ? "text-purple-800"
                              : "text-gray-600"
                          }`}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className={`text-xs ${
                            index === currentBenefit
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Packages */}
          <div className="lg:col-span-2">
            {/* Discount Banner */}
            {/* <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Gift className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Get up to 30% off on coin purchases!</span>
              </div>
              <button className="text-white underline text-sm mt-1 hover:no-underline">
                View all coupons
              </button>
            </div> */}

            {/* Current Selection Summary */}
            {selectedPackage && (
              <div className="bg-white rounded-2xl p-4 mb-6 border-2 border-purple-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Selected Package
                </h3>
                {(() => {
                  const pkg = coinPacks.find((p) => p.id === selectedPackage)!;
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pkg.coins} Coins</p>
                        <p className="text-sm text-gray-600">
                          Save %
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{pkg.amount}
                        </p>
                        <button
                          onClick={() => setSelectedPackage(null)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {coinPacks.length > 0 ? (
                coinPacks.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedPackage === pkg.id
                        ? "ring-2 ring-purple-500 shadow-lg transform scale-105"
                        : "border border-gray-200 hover:border-purple-300 hover:shadow-md"
                    } ${pkg.isBonusPack ? "relative" : ""}`}
                  >
                    {pkg.isBonusPack && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Bonus Pack
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Coins className="h-6 w-6 text-purple-600" />
                        <span className="text-xl font-bold text-gray-800">
                          {pkg.coin_value}
                        </span>
                        <span className="text-gray-600">coins</span>
                      </div>
                      {pkg.isTrialPack && (
                        <div className="flex items-center space-x-1">
                          <Tag className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium text-sm">
                            Trial Pack
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-purple-600">
                          ₹{pkg.amount}
                        </span>
                      </div>
                    </div>

                    {selectedPackage === pkg.id && (
                      <div className="mt-4 p-2 bg-purple-50 rounded-lg text-center">
                        <CheckCircle className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <span className="text-sm text-purple-700 font-medium">
                          Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center w-full text-gray-500">Loading...</p>
              )}
            </div>

            {/* Bottom CTA */}
            {selectedPackage && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-t-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{coinPacks.find((p) => p.id === selectedPackage)?.amount}
                    </p>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="bg-mint-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                    style={{ backgroundColor: "#27CDB1" }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add Coins Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
