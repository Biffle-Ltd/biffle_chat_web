import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import { apiUri } from '../utility/constants';
interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (userData: any) => void;
}

// API configuration

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userType, setUserType] = useState<'fan' | 'creator' | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('91');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUri}/api/v1/auth/login/otp/request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: countryCode,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      // Login with OTP
      const loginResponse = await fetch(`${apiUri}/api/v1/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'phone',
          country_code: countryCode,
          phone_number: phoneNumber,
          otp: otp,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok && loginData.token) {
        // Get user details
        const userDetailsResponse = await fetch(`${apiUri}/api/v1/user_center/details/get-user-details/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json',
          },
        });

        const userDetailsData = await userDetailsResponse.json();

        if (userDetailsResponse.ok) {
          // Store user data in localStorage or state management
          const userData = {
            ...userDetailsData,
            token: loginData.token
          };
          
          onLogin(userData);

          // Check if user is new or existing based on user details
          if (userDetailsData.is_new_user || !userDetailsData.user_type) {
            // New user - ask for user type
            setStep('profile');
          } else {
            // Existing user - redirect based on type
            if (userDetailsData.user_type === 'creator') {
              onNavigate('creator-dashboard');
            } else {
              onNavigate('coins');
            }
          }
        } else {
          setError('Failed to get user details. Please try again.');
        }
      } else {
        setError(loginData.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = (type: 'fan' | 'creator') => {
    setUserType(type);
    
    // Update user type in backend if needed
    // You might want to call an API to update user type here
    
    if (type === 'fan') {
      onNavigate('coins');
    } else {
      onNavigate('creator-dashboard');
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUri}/api/v1/auth/login/otp/request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: countryCode,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP sent successfully!');
      } else {
        setError(data.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button 
          onClick={() => step === 'phone' ? onNavigate('home') : setStep(step === 'otp' ? 'phone' : 'otp')}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {step === 'phone' && (
            <>
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join Biffle'}
                </h1>
                <p className="text-gray-600">
                  {isLogin ? 'Enter your phone number to continue' : 'Create your account to get started'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">+{countryCode}</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="9876543210"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We never share your number with anyone
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={phoneNumber.length !== 10 || isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  {isLogin ? "New here? Create an account" : "Already have an account? Login"}
                </button>
              </div>

              {/* Trust Signals */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Private
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Phone</h1>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to +{countryCode} {phoneNumber}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                    placeholder="- - - - - -"
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium disabled:opacity-50"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </>
          )}

          {step === 'profile' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Path</h1>
                <p className="text-gray-600">How would you like to use Biffle?</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleProfileSubmit('fan')}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-xl group-hover:shadow-lg transition-shadow">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">I'm a Fan</h3>
                      <p className="text-gray-600 text-sm">
                        Discover amazing creators, buy coins, and enjoy exclusive interactions
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleProfileSubmit('creator')}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-xl group-hover:shadow-lg transition-shadow">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">I'm a Creator</h3>
                      <p className="text-gray-600 text-sm">
                        Share your content, connect with fans, and monetize your passion
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Additional Options */}
        {/* {step === 'phone' && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-4">Or continue with</p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-white border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
              <button className="flex-1 bg-white border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}