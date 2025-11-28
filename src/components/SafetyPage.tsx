import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Mail, 
  FileText,
  Heart,
  Zap,
  Star
} from 'lucide-react';
import safetyData from '../constants/safety.json';

const SafetyPage: React.FC = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "AI-Moderation",
      description: "Advanced AI systems scan content in real-time",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Users,
      title: "24/7 Human Team",
      description: "Dedicated moderators available round the clock",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Lock,
      title: "Secure Verification",
      description: "Multi-factor authentication & identity verification",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Content Protection",
      description: "Watermarking and digital rights management",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const complianceItems = [
    { title: "Information Technology Act, 2000", status: "compliant" },
    { title: "Bharatiya Nyaya Sanhita, 2023", status: "compliant" },
    { title: "Consumer Protection Act, 2019", status: "compliant" },
    { title: "PCI DSS Compliance", status: "compliant" },
    { title: "GDPR Data Protection", status: "compliant" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 lg:pt-6 lg:pb-8">
          <div className="text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Safety & <span className="text-yellow-300">Compliance</span>
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your safety is our top priority. We maintain the highest standards of security and compliance to protect our community.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>24/7 Monitoring</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-300" />
                <span>End-to-End Encryption</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>Industry Leading</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Safety Measures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple layers of protection working together to keep our community safe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Compliance Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We adhere to the highest standards of compliance and regulatory requirements
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Safety Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Safety Guidelines & Procedures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive information about our safety policies and procedures
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(safetyData.sections).map(([sectionKey, section]) => {
              if (sectionKey === 'introduction' || sectionKey === 'contactInformation') return null; // Skip introduction and contact info
              
              const getSectionIcon = (key: string) => {
                switch (key) {
                  case 'safetyMeasures': return Shield;
                  case 'complianceStandards': return FileText;
                  case 'reportingSystem': return AlertTriangle;
                  case 'userGuidelines': return Users;
                  case 'emergencyProcedures': return Zap;
                  case 'creatorSafety': return Heart;
                  case 'transparency': return Eye;
                  case 'contactInformation': return Phone;
                  default: return Shield;
                }
              };

              const getSectionColor = (key: string) => {
                switch (key) {
                  case 'safetyMeasures': return 'from-purple-500 to-violet-500';
                  case 'complianceStandards': return 'from-blue-500 to-cyan-500';
                  case 'reportingSystem': return 'from-red-500 to-pink-500';
                  case 'userGuidelines': return 'from-green-500 to-emerald-500';
                  case 'emergencyProcedures': return 'from-orange-500 to-red-500';
                  case 'creatorSafety': return 'from-pink-500 to-rose-500';
                  case 'transparency': return 'from-indigo-500 to-purple-500';
                  case 'contactInformation': return 'from-teal-500 to-blue-500';
                  default: return 'from-purple-500 to-violet-500';
                }
              };

              const IconComponent = getSectionIcon(sectionKey);
              const colorClass = getSectionColor(sectionKey);
              
              return (
                <div key={sectionKey} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    {/* Header */}
                    <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                      <div className={`bg-gradient-to-r ${colorClass} p-3 rounded-xl mr-4 group-hover:scale-105 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {section.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {section.content && (
                        <div className="mb-8">
                          {section.content.map((paragraph, index) => (
                            <p key={index} className="text-gray-600 leading-relaxed text-lg">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Subsections */}
                      {'subsections' in section && section.subsections && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {section.subsections.map((subsection: any, index: number) => {
                            if (typeof subsection === 'string') {
                              return (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors duration-200">
                                  <div className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{subsection}</p>
                                  </div>
                                </div>
                              );
                            }
                            
                            return (
                              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors duration-200 h-full">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                  {subsection.title}
                                </h4>
                                {subsection.content && (
                                  <div className="space-y-3">
                                    {subsection.content.map((item: string, idx: number) => (
                                      <div key={idx} className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Need Help?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Our safety team is here to help. Contact us anytime for support or to report concerns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Mail className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">General Support</h3>
                <p className="text-purple-100 text-sm">safety@biffle.ai</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Phone className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emergency</h3>
                <p className="text-purple-100 text-sm">24/7 In-App Reporting</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <FileText className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Legal Matters</h3>
                <p className="text-purple-100 text-sm">legal@biffle.ai</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <AlertTriangle className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Grievance Officer</h3>
                <p className="text-purple-100 text-sm">grievance@biffle.ai</p>
              </div>
            </div>

            <div className="mt-8 text-sm text-purple-200">
              Last Updated: {safetyData.lastUpdated}
            </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default SafetyPage; 