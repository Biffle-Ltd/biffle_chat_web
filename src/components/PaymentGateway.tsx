import React, { useState } from 'react';
import { ArrowLeft, Shield, CreditCard, Smartphone, Building, Wallet, CheckCircle, Copy } from 'lucide-react';

interface PaymentGatewayProps {
  onNavigate: (page: string) => void;
  selectedPackage: any;
  appliedCoupon: string | null;
}

export default function PaymentGateway({ onNavigate, selectedPackage, appliedCoupon }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Calculate final amount based on selected package and coupon
  const packageData = { coins: selectedPackage.coins, discountedPrice: selectedPackage.price };
  const additionalDiscount = appliedCoupon === 'FIRST10' ? Math.floor(selectedPackage.price * 0.1) : 0;
  const finalAmount = packageData.discountedPrice - additionalDiscount;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful! Coins added to your account.');
      onNavigate('coins');
    }, 3000);
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI ID' },
    { id: 'card', name: 'Card', icon: CreditCard, description: 'Credit/Debit Cards' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'Online Banking' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, description: 'PayTM, PhonePe, etc.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => onNavigate('payment-summary')}
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Secure Payment</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Amount Display */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl p-6 text-white mb-6">
          <div className="text-center">
            <p className="text-purple-100 mb-2">Amount to Pay</p>
            <p className="text-4xl font-bold mb-2">₹{finalAmount}</p>
            <p className="text-purple-200 text-sm">For {packageData.coins} Biffle Coins</p>
          </div>
        </div>

        {/* Payment Method Tabs */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <method.icon 
                    className={`h-6 w-6 ${
                      selectedMethod === method.id ? 'text-purple-600' : 'text-gray-600'
                    }`} 
                  />
                  <span 
                    className={`font-medium text-sm ${
                      selectedMethod === method.id ? 'text-purple-700' : 'text-gray-700'
                    }`}
                  >
                    {method.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {selectedMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@bankname"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter your UPI ID to receive payment request
                </p>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Bank
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}

            {selectedMethod === 'wallet' && (
              <div className="grid grid-cols-2 gap-4">
                {['PayTM', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                  <button
                    key={wallet}
                    className="p-4 border border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
                  >
                    <span className="font-medium text-gray-700">{wallet}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">Payment Security</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">Bank Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">Fraud Protection</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Secured by <span className="font-medium">Razorpay</span> • 
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-t-2xl shadow-lg">
          <button 
            onClick={handlePayment}
            disabled={isProcessing || (selectedMethod === 'upi' && !upiId)}
            className="w-full bg-mint-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ backgroundColor: '#27CDB1' }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              `Pay ₹${finalAmount}`
            )}
          </button>
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
            <span>Powered by</span>
            <div className="flex space-x-3">
              <span className="bg-gray-100 px-2 py-1 rounded">Razorpay</span>
              <span className="bg-gray-100 px-2 py-1 rounded">JusPay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}