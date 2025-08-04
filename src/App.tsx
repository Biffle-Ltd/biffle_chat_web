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

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'creators':
        return <CreatorLanding onNavigate={handleNavigation} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'coins':
        return <CoinPackages onNavigate={handleNavigation} />;
      case 'payment-summary':
        return <PaymentSummary onNavigate={handleNavigation} />;
      case 'payment-gateway':
        return <PaymentGateway onNavigate={handleNavigation} />;
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
      {showHeaderFooter && <Header currentPage={currentPage} onNavigate={handleNavigation} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;