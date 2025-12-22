import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import CreatorLanding from "./components/CreatorLanding";
import LoginPage from "./components/LoginPage";
import CoinPackages from "./components/CoinPackages";
import PaymentSummary from "./components/PaymentSummary";
import PaymentGateway from "./components/PaymentGateway";
import PayUCallback from "./components/PayUCallback";
import CreatorRegistrationForm from "./components/CreatorRegistrationForm";
import AboutUsPage from "./components/AboutUsPage";
import GuidelinesPage from "./components/GuidelinesPage";
import PrivacyPage from "./components/PrivacyPage";
import SafetyPage from "./components/SafetyPage";
import TermsPage from "./components/TermsPage";
import RefundPolicyPage from "./components/RefundPolicyPage";
import ContactUs from "./components/ContactUs";
import ProductsServices from "./components/ProductAndServices";
import PricingPage from "./components/Pricing";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  user_type: "fan" | "creator";
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

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=ai.biffle";

const PlayStoreRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.replace(PLAY_STORE_URL);
  }, []);

  return null;
};

function AppContent() {
  const [user, setUser] = React.useState<User | null>(null);
  const [selectedPackage, setSelectedPackage] =
    React.useState<SelectedPackage | null>(null);
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for stored user data on app load
  React.useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUser({ ...userData, token: storedToken });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const handleNavigation = (page: string) => {
    // If trying to access coins page without login, redirect to login
    if (page === "coins" && !user) {
      navigate("/login");
      return;
    }
    // If trying to access login page while already logged in, redirect to coins
    if (page === "login" && user) {
      navigate("/coins");
      return;
    }
    navigate(
      page === "home"
        ? "/"
        : page === "login"
        ? "/login"
        : page === "creators"
        ? "/creators"
        : page === "coins"
        ? "/coins"
        : page === "payment-summary"
        ? "/payment-summary"
        : page === "payment-gateway"
        ? "/payment-gateway"
        : page === "creator-registration"
        ? "/creator-registration"
        : page === "about"
        ? "/about"
        : page === "guidelines"
        ? "/guidelines"
        : page === "privacy"
        ? "/privacy"
        : page === "terms"
        ? "/terms"
        : page === "refund"
        ? "/refund"
        : page === "safety"
        ? "/safety"
        : page === "support"
        ? "/support"
        : page === "products"
        ? "/products"
        : page === "pricing"
        ? "/pricing"
        : "/"
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/coins");
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedPackage(null);
    setAppliedCoupon(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handlePackageSelect = (pkg: SelectedPackage) => {
    setSelectedPackage(pkg);
  };

  // Hide header/footer on these routes
  const hideHeaderFooterRoutes = [
    "/login",
    "/coins",
    "/payment-summary",
    "/payment-gateway",
    "/payu/callback",
  ];
  const showHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && (
        <Header
          currentPage={location.pathname}
          onNavigate={handleNavigation}
          user={user}
          onLogout={handleLogout}
        />
      )}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onNavigate={handleNavigation} user={user} />}
          />
          <Route
            path="/creators"
            element={<CreatorLanding onNavigate={handleNavigation} />}
          />
          <Route
            path="/login"
            element={
              <LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />
            }
          />
          <Route
            path="/coins"
            element={
              <CoinPackages
                onNavigate={handleNavigation}
                onPackageSelect={handlePackageSelect}
                user={user}
              />
            }
          />
          <Route
            path="/payment-summary"
            element={
              <PaymentSummary
                onNavigate={handleNavigation}
                selectedPackage={selectedPackage}
                appliedCoupon={appliedCoupon}
                onCouponApply={setAppliedCoupon}
              />
            }
          />
          <Route
            path="/payment-gateway"
            element={
              <PaymentGateway
                onNavigate={handleNavigation}
                selectedPackage={selectedPackage}
                appliedCoupon={appliedCoupon}
              />
            }
          />
          <Route
            path="/payu/callback"
            element={<PayUCallback onNavigate={handleNavigation} />}
          />
          <Route
            path="/creator-registration"
            element={<CreatorRegistrationForm onNavigate={handleNavigation} />}
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/support" element={<ContactUs />} />
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/app" element={<PlayStoreRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer onNavigate={handleNavigation} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
