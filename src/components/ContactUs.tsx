import { Mail, Phone, MapPin, Users, AlertTriangle, MessageCircle, HelpCircle, Clock, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

const ContactUs = () => {
  const contactData = {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you!",
    description: "Whether you have questions, feedback, or partnership inquiries, our team is here to help.",
    sections: {
      getInTouch: {
        title: "General Support",
        icon: Mail,
        color: "from-blue-500 to-blue-600",
        content: [
          { type: "email", label: "Email", value: "support@biffle.ai", href: "mailto:support@biffle.ai" },
          { type: "phone", label: "Phone", value: "+91 9988998987", href: "tel:+919988998987" },
        ],
      },
      socialMedia: {
        title: "Follow Us",
        icon: MessageCircle,
        color: "from-purple-500 to-purple-600",
        content: [
          { type: "linkedin", label: "LinkedIn", value: "Biffle.ai", href: "https://www.linkedin.com/company/biffle-ai/" },
          { type: "facebook", label: "Facebook", value: "Biffle.ai", href: "https://www.facebook.com/profile.php?id=61574120158673" },
          { type: "instagram", label: "Instagram", value: "@Biffle.ai", href: "https://www.instagram.com/biffle.ai" },
          { type: "youtube", label: "YouTube", value: "Biffle.ai", href: "https://www.youtube.com/@biffle-ai" },
        ],
      },
      operatingAddress: {
        title: "Office Address",
        icon: MapPin,
        color: "from-green-500 to-green-600",
        content: [
          "Biffle.ai (Sofnics Tech Labs Pvt. Ltd.)",
          "3rd Floor, B-12, Kh No.82/9, Mahavir Enclave",
          "New Delhi, South West Delhi,",
          "Delhi - 110045, India",
        ],
      },
      businessPartnerships: {
        title: "Business & Partnerships",
        icon: Users,
        color: "from-orange-500 to-orange-600",
        description: "For collaborations, creator onboarding, or payment gateway integrations",
        content: [
          { type: "email", label: "Partnerships", value: "partnerships@biffle.ai", href: "mailto:partnerships@biffle.ai" },
        ],
      },
      grievanceOfficer: {
        title: "Grievance Officer",
        icon: AlertTriangle,
        color: "from-red-500 to-red-600",
        description: "As per IT Act compliance, contact our Grievance Officer for content-related concerns",
        content: [
          { type: "email", label: "Grievance", value: "grievance@biffle.ai", href: "mailto:grievance@biffle.ai" },
        ],
      },
      faq: {
        title: "Help Center",
        icon: HelpCircle,
        color: "from-indigo-500 to-indigo-600",
        description: "For quick answers to common questions",
        content: ["Visit our comprehensive FAQ section"],
      },
    },
    responseTime: "We'll respond within 24-48 hours!",
  };

  const hasDescription = (s: unknown): s is { description: string } => {
    return typeof (s as any)?.description === "string";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-6 pb-6 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in <span className="text-yellow-400">Touch</span>
          </h1>
            <p className="text-xl text-purple-100 mb-2">
              {contactData.subtitle}
            </p>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            {contactData.description}
          </p>
          </div>
          
          {/* Response Time Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">{contactData.responseTime}</span>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* Follow Us Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Follow Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a
              href="https://www.linkedin.com/company/biffle-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            >
              <Linkedin className="h-10 w-10 mb-3" />
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61574120158673"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            >
              <Facebook className="h-10 w-10 mb-3" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/biffle.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            >
              <Instagram className="h-10 w-10 mb-3" />
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@biffle-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-8 text-white text-center font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            >
              <Youtube className="h-10 w-10 mb-3" />
              YouTube
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Other Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="mailto:support@biffle.ai"
                  className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-8 text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center mb-3">
                    <Mail className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">Email</h3>
                  </div>
                  <p className="text-purple-100">support@biffle.ai</p>
                </a>
                <a
                  href="tel:+919988998987"
                  className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-8 text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center mb-3">
                    <Phone className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">Phone</h3>
                  </div>
                  <p className="text-purple-100">+91 9988998987</p>
                </a>
              </div>
            </div>

            {/* Business, Grievance, Help */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Business */}
                <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-6 text-white">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-semibold">Business</h3>
                  </div>
                  <p className="text-sm text-purple-100 mb-3">For partnerships & collaborations</p>
                  <a href="mailto:partnerships@biffle.ai" className="text-white font-medium hover:underline">
                    partnerships@biffle.ai
                  </a>
                </div>

                {/* Grievance */}
                <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-6 text-white">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-semibold">Grievance</h3>
                  </div>
                  <p className="text-sm text-purple-100 mb-3">Content-related concerns</p>
                  <a href="mailto:grievance@biffle.ai" className="text-white font-medium hover:underline">
                    grievance@biffle.ai
                  </a>
                </div>

                {/* Help */}
                <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-6 text-white">
                  <div className="flex items-center mb-4">
                    <HelpCircle className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-semibold">Help</h3>
                  </div>
                  <p className="text-sm text-purple-100 mb-3">Quick answers & support</p>
                  <p className="text-white font-medium">Visit FAQ Section</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Office Address */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Office Address</h2>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Biffle.ai</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Sofnics Tech Labs Pvt. Ltd.<br />
                      3rd Floor, B-12,<br />
                      Kh No.82/9, Mahavir Enclave<br />
                      New Delhi, South West Delhi<br />
                      Delhi - 110045, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-6 bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                <div className="flex items-center text-purple-700">
                  <Clock className="h-5 w-5 mr-2" />
                  <p className="font-medium">{contactData.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
