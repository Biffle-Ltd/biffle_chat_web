import React from "react";

export const PricingPage = () => {
  const pricingData = {
    title: "Pricing for Service Offerings",
    description:
      "At Biffle.ai, we offer flexible monetization options to cater to different user preferences—whether they want pay-as-you-go access, premium subscriptions, or free trials. Our model ensures sustainable revenue while delivering high-value content to our users.",
    sections: {
      tieredPlans: {
        title: "Tiered Subscription Plans",
        subsections: [
          {
            title: "Free Tier (Ad-Supported)",
            content: [
              "Access to limited content (limited daily posts)",
              "Advertisements between content",
              "No direct creator interactions",
              "Price: INR 1 (for registration)",
            ],
          },
          {
            title: "Premium Subscription (Ad-Free + Full Access)",
            description:
              "Unlimited content (text, audio, priority chats), Early access to trending topics, Exclusive AMAs & live sessions, Personalized recommendations",
            content: [
              "Monthly: INR 299/month",
              "Quarterly: INR 699/quarter",
              "Annual: INR 2,999/year",
              "Free 7-day trial available for first-time users",
            ],
          },
        ],
      },
      coinSystem: {
        title: "Coin-Based System (Microtransactions for Premium Features)",
        description: 'Users can purchase "Biffle Coins" to unlock:',
        content: [
          "Exclusive one-on-one creator Q&As (50-100 coins per chat)",
          "Premium short videos (10-30 coins per unlock)",
          "Tip your favorite creators (Supports direct monetization)",
          "Early access to live sessions (20-50 coins)",
        ],
        subsections: [
          {
            title: "Coin Pricing",
            content: [
              "100 Coins – INR 99",
              "300 Coins – INR 249",
              "1000 Coins – INR 699",
              "2500 Coins – INR 1,499",
            ],
          },
        ],
      },
    },
    lastUpdated: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {pricingData.title}
          </h1>

          {/* Main Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {pricingData.description}
          </p>

          {Object.entries(pricingData.sections).map(([sectionKey, section]) => (
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
                    {section.content.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                      >
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsections */}
                {section?.subsections && (
                  <div className="ml-2">
                    <ol className="space-y-3 list-decimal list-inside ml-6">
                      {section.subsections.map((subsection, index) => (
                        <div key={index} className="mb-4">
                          {/* Subsection Title */}
                          <h3 className="text-base font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg mb-3 hover:bg-gray-100 transition-colors duration-200 -ml-6 list-none">
                            {subsection?.title}
                          </h3>

                          <div className="pl-2 -ml-6">
                            {/* Subsection Description */}
                            {subsection?.description && (
                              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                {subsection.description}
                              </p>
                            )}

                            {/* Subsection Content */}
                            {subsection?.content && (
                              <ul className="space-y-2">
                                {subsection.content.map((contentItem, idx) => (
                                  <li
                                    key={idx}
                                    className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                                  >
                                    <span
                                      className={
                                        contentItem.includes("INR")
                                          ? "font-medium text-green-700"
                                          : ""
                                      }
                                    >
                                      {contentItem}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Special Offer Highlight */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-green-800 text-lg font-medium text-center">
              🎉 Start with our Free 7-day Premium Trial!
            </p>
          </div>

          {/* Divider and Last Updated */}
          <hr className="border-gray-200 mt-6 mb-4" />
          <p className="text-sm text-gray-500 text-center">
            Last Updated: {pricingData.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
