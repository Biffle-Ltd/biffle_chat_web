import React from "react";

const ContactUs = () => {
  const contactData = {
    title: "Contact Us",
    description:
      "We'd love to hear from you! Whether you have questions, feedback, or partnership inquiries, our team is here to help.",
    sections: {
      getInTouch: {
        title: "Get in Touch",
        content: [
          <div>📧 Email: support@biffle.ai</div>,
          <div>📞 Phone: +91 9988998987</div>,
          <a
            href="https://www.linkedin.com/company/biffle-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className=" flex items-center hover:text-blue-500"
            key="linkedin"
          >
            💼 LinkedIn
          </a>,
          <a
            href="https://www.facebook.com/profile.php?id=61574120158673"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-500"
            key="facebook"
          >
            📘 Facebook
          </a>,
          <a
            href="https://www.instagram.com/biffle.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-500"
            key="instagram"
          >
            📸 Instagram
          </a>,
          <a
            href="https://www.youtube.com/@biffle-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-500"
            key="youtube"
          >
            ▶️ YouTube
          </a>,
        ],
      },
      operatingAddress: {
        title: "📍 Operating Address",
        content: [
          "Biffle.ai (Sofnics Tech Labs Pvt. Ltd.)",
          "3rd Floor, B-12, Kh No.82/9, Mahavir Enclave",
          "New Delhi, South West Delhi,",
          "Delhi - 110045, India",
        ],
      },
      businessPartnerships: {
        title: "Business & Partnerships",
        description:
          "For collaborations, creator onboarding, or payment gateway integrations:",
        content: ["📧 Email: partnerships@biffle.ai"],
      },
      grievanceOfficer: {
        title: "Grievance Officer",
        description:
          "As per IT Act compliance, contact our Grievance Officer for content-related concerns:",
        content: ["📧 Email: grievance@biffle.ai"],
      },
      followUs: {
        title: "Follow Us",
        description:
          "Stay updated with our latest features and community news:",
        content: [
          "🐦 Twitter: @Biffle_ai",
          "📸 Instagram: @Biffle.ai",
          "💼 LinkedIn: Biffle.ai",
        ],
      },
      faq: {
        title: "Visit Our FAQ Section",
        content: ["For quick answers, check out our Help Center."],
      },
    },
    responseTime: "We'll respond within 24-48 hours!",
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {contactData.title}
          </h1>

          {/* Main Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed text-center">
            {contactData.description}
          </p>

          {Object.entries(contactData.sections).map(([sectionKey, section]) => (
            <div key={sectionKey} className="mb-8">
              {/* Section Title */}
              <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
                {section.title}
              </h2>

              <div className="px-4 pb-4">
                {/* Section Description */}
                {section?.description && (
                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    {section.description}
                  </p>
                )}

                {/* Section Content */}
                {section?.content && (
                  <ul className="space-y-2">
                    {section.content.map((item, index) =>
                      typeof item === "string" ? (
                        <li
                          key={index}
                          className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                        >
                          <span>{item}</span>
                        </li>
                      ) : (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          ))}

          {/* Response Time Highlight */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 text-lg font-medium text-center">
              {contactData.responseTime}
            </p>
          </div>

          {/* Divider and Last Updated */}
          <hr className="border-gray-200 mt-6 mb-4" />
          <p className="text-sm text-gray-500 text-center">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
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
