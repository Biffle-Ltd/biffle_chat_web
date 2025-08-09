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
import AboutUsPage from './components/AboutUsPage';
import GuidelinesPage from './components/GuidelinesPage';
import PrivacyPage from './components/PrivacyPage';
import SafetyPage from './components/SafetyPage';
import TermsPage from './components/TermsPage';
import ContactUs from './components/ContactUs';

type Page = 'home' | 'creators' | 'login' | 'coins' | 'payment-summary' | 'payment-gateway' | 'safety' | 'support' | 'creator-registration' | 'about' | 'guidelines' | 'privacy' | 'terms';

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
    // If trying to access login page while already logged in, redirect to coins
    if (page === 'login' && user) {
      setCurrentPage('coins');
      return;
    }
    setCurrentPage(page as Page);
    
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <LandingPage onNavigate={handleNavigation} user={user} />;
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
      case 'about':
        return <AboutUsPage />;
      case 'guidelines':
        return <GuidelinesPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'safety':
        return <SafetyPage />;
      case 'support':
        return <ContactUs />;
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
      {showHeaderFooter && <Footer onNavigate={handleNavigation} />}
    </div>
  );
}

export default App;