import React, { useState } from 'react';
import { ArrowLeft, Tag, Percent, Coins, ShoppingCart, Gift } from 'lucide-react';

interface PaymentSummaryProps {
  onNavigate: (page: string) => void;
  selectedPackage: any;
  appliedCoupon: string | null;
  onCouponApply: (coupon: string | null) => void;
}

export default function PaymentSummary({ onNavigate, selectedPackage, appliedCoupon, onCouponApply }: PaymentSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  
  // If no package selected, redirect back to coins page
  React.useEffect(() => {
    if (!selectedPackage) {
      onNavigate('coins');
    }
  }, [selectedPackage, onNavigate]);

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No package selected</p>
          <button 
            onClick={() => onNavigate('coins')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium"
          >
            Select Package
          </button>
        </div>
      </div>
    );
  }

  const packageData = {
    coins: selectedPackage.coins,
    basePrice: selectedPackage.originalPrice,
    discountedPrice: selectedPackage.price,
    websiteDiscount: selectedPackage.originalPrice - selectedPackage.price
  };

  const additionalDiscount = appliedCoupon === 'FIRST10' ? Math.floor(packageData.discountedPrice * 0.1) : 0;
  const finalAmount = packageData.discountedPrice - additionalDiscount;

  const handleCouponApply = () => {
    if (couponCode.toUpperCase() === 'FIRST10') {
      onCouponApply('FIRST10');
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleProceedToPayment = () => {
    onNavigate('payment-gateway');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => onNavigate('coins')}
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Payment Summary</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Details */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Package</h2>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-full">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{packageData.coins} Coins</h3>
                <p className="text-sm text-gray-600">Digital currency for creator interactions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 line-through">₹{packageData.basePrice}</p>
              <p className="text-2xl font-bold text-purple-600">₹{packageData.discountedPrice}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">₹{packageData.basePrice}</span>
            </div>
            
            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>Website Discount (10%)</span>
              </div>
              <span className="font-medium">-₹{packageData.websiteDiscount}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between items-center text-green-600">
                <div className="flex items-center space-x-1">
                  <Percent className="h-4 w-4" />
                  <span>Coupon: {appliedCoupon}</span>
                </div>
                <span className="font-medium">-₹{additionalDiscount}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-purple-600">₹{finalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Gift className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Apply Coupon</h3>
          </div>

          {!appliedCoupon ? (
            <div className="flex space-x-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleCouponApply}
                disabled={!couponCode}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Tag className="h-3 w-3" />
                  </div>
                  <span className="text-green-700 font-medium">Coupon Applied: {appliedCoupon}</span>
                </div>
                <button
                  onClick={() => onCouponApply(null)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              <p className="text-green-600 text-sm mt-1">You saved ₹{additionalDiscount}!</p>
            </div>
          )}

          <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
            <p className="text-yellow-800 text-sm font-medium">Available Coupons:</p>
            <p className="text-yellow-700 text-xs">• FIRST10 - Get ₹45 off on your first purchase</p>
            <p className="text-yellow-700 text-xs">• SAVE20 - 20% off on purchases above ₹1000</p>
          </div>
        </div>

        {/* Payment Method Preview */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium">Secure Payment Gateway</p>
              <p className="text-sm text-gray-600">UPI • Cards • NetBanking • Wallets</p>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-t-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Amount to Pay</p>
              <p className="text-3xl font-bold text-purple-600">₹{finalAmount}</p>
            </div>
            <button 
              onClick={handleProceedToPayment}
              className="bg-mint-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: '#27CDB1' }}
            >
              Proceed to Payment
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by industry-leading encryption
          </p>
        </div>
      </div>
    </div>
  );
}