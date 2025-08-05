import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import CreatorLanding from './components/CreatorLanding';
import LoginPage from './components/LoginPage';
import CoinPackages from './components/CoinPackages';
import PaymentSummary from './components/PaymentSummary';
import PaymentGateway from './components/PaymentGateway';
import CreatorRegistrationForm from './components/CreatorRegistrationForm';

type Page = 'home' | 'creators' | 'login' | 'coins' | 'payment-summary' | 'payment-gateway' | 'safety' | 'support' | 'creator-registration';

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  user_type: 'fan' | 'creator';
  is_new_user: boolean;
  token: string;
}

interface SelectedPackage {
  id: number;
  coins: number;
  price: number;
  originalPrice: number;
  discount: number;
}
function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Check for stored user data on app load
  React.useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedToken && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser({ ...userData, token: storedToken });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleNavigation = (page: string) => {
    // If trying to access coins page without login, redirect to login
    if (page === 'coins' && !user) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page as Page);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedPackage(null);
    setAppliedCoupon(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setCurrentPage('home');
  };

  const handlePackageSelect = (pkg: SelectedPackage) => {
    setSelectedPackage(pkg);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'creators':
        return <CreatorLanding onNavigate={handleNavigation} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />;
      case 'coins':
        return <CoinPackages onNavigate={handleNavigation} onPackageSelect={handlePackageSelect} user={user} />;
      case 'payment-summary':
        return <PaymentSummary 
          onNavigate={handleNavigation} 
          selectedPackage={selectedPackage}
          appliedCoupon={appliedCoupon}
          onCouponApply={setAppliedCoupon}
        />;
      case 'payment-gateway':
        return <PaymentGateway 
          onNavigate={handleNavigation} 
          selectedPackage={selectedPackage}
          appliedCoupon={appliedCoupon}
        />;
      case 'creator-registration':
        return <CreatorRegistrationForm onNavigate={handleNavigation} />;
      case 'safety':
        return (
          <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">Safety & Compliance</h1>
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <p className="text-gray-600 leading-relaxed">
                  At Biffle, user safety is our top priority. We maintain strict compliance with industry standards 
                  and implement comprehensive moderation policies to ensure a safe environment for all users.
                </p>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">Support Center</h1>
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <p className="text-gray-600 leading-relaxed">
                  Need help? Our support team is here to assist you 24/7. Contact us through our help center 
                  or reach out directly for any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  const showHeaderFooter = !['login', 'coins', 'payment-summary', 'payment-gateway'].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && <Header currentPage={currentPage} onNavigate={handleNavigation} user={user} onLogout={handleLogout} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;