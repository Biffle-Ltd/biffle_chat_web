import React from "react";

export const ProductsServices = () => {
  const productsData = {
    title: "Product & Service Offerings",
    description:
      "At Biffle.ai, we specialize in short-form, conversational content designed for quick consumption, engagement, and entertainment. Our platform offers a rich variety of content formats—text, audio, and short video—curated and created by verified experts and premium creators. Fresh content is released daily, covering trending topics to keep users informed, entertained, and inspired.",
    sections: {
      contentCategories: {
        title: "Content Categories & Offerings",
        subsections: [
          {
            title: "1. Short Video Content (60-90 sec)",              
            subsections: [
                "Bite-sized, high-impact videos designed for quick consumption:",
              "Expert Insights (Career tips, finance hacks, health advice)",
              "Trending News Recaps (IPL updates, Bollywood gossip, tech trends)",
              "Lifestyle & Travel (Quick travel guides, food trends, fashion tips)",
              "Astrology & Spirituality (Daily horoscopes, zodiac predictions)",
              "Motivational & Self-Improvement (Micro-lessons, productivity hacks)",
            ],
          },
          {
            title: "2. Premium Content Feed (Text, Audio, Video)",
            subsections: [
                "A daily refreshed feed offering exclusive content for subscribers:",
              "Text Snips (Quick-read articles, fun facts, Q&A with experts)",
              "Audio Bytes (Podcast-style snippets, motivational talks, storytelling)",
              "Interactive Videos (Polls, quizzes, live Q&A replays)",
            ],
          },
          {
            title: "3. Trending Conversational Categories",
            subsections: [
                "We cover the most engaging topics that users love:",
              "Astrology & Horoscopes – Daily predictions, planetary influences",
              "Bollywood & Entertainment – Gossip, movie reviews, celeb interviews",
              "Sports (IPL, Cricket, Football) – Match highlights, expert analysis",
              "Learning & Skill Building – Micro-courses, language tips, career advice",
              "Travel & Adventure – Hidden destinations, budget travel hacks",
              "Finance & Investing – Stock market updates, personal finance tips",
              "Health & Wellness – Quick workouts, mental health tips, diet guides",
            ],
          },
          {
            title: "4. Exclusive Creator-Led Experiences",
            subsections: [
              '"Ask Me Anything" (AMA) Sessions – Direct Q&A with experts',
              "Live audio-interactive discussions – 10-15 min live discussions on trending topics",
              "Personalized Recommendations – AI-driven content suggestions",
            ],
          },
        ],
      },
      whyChoose: {
        title: "Why Choose Biffle.ai?",
        content: [
          "✔ Daily Fresh Content – New uploads every day to keep you engaged",
          "✔ Multi-Format Consumption – Read, listen, or watch based on preference",
          "✔ Expert-Verified Quality – No misinformation, only trusted creators",
          "✔ Ad-Free Premium Experience – No distractions, just pure content",
          "✔ Interactive & Engaging – Polls, quizzes, and direct creator interactions",
        ],
      },
      conclusion: {
        title: "Get Started Today",
        description:
          "Whether you're looking for quick entertainment, expert knowledge, or cultural insights, Biffle.ai delivers meaningful short-form content that fits your lifestyle.",
      },
    },
    callToAction: "Subscribe Now – Stay Curious, Stay Engaged!",
    downloadPrompt: "Download the app now!",
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {productsData.title}
          </h1>

          {/* Main Description */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {productsData.description}
          </p>

          {Object.entries(productsData.sections).map(
            ([sectionKey, section]) => (
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
                      {section.content.map((paragraph, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                        >
                          <span>{paragraph}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections */}
                  {section?.subsections && (
                    <div className="ml-2">
                      <ol className="space-y-3 list-decimal list-inside ml-6">
                        {section.subsections.map((paragraph, index) =>
                          typeof paragraph === "string" ? (
                            <div
                              key={index}
                              className="text-gray-600 text-lg leading-relaxed"
                            >
                              {paragraph}
                            </div>
                          ) : (
                            <div key={index} className="mb-4">
                              {/* Subsection Title */}
                              <h3 className="text-base font-semibold text-gray-900 p-3 bg-gray-50 rounded-lg mb-3 hover:bg-gray-100 transition-colors duration-200 -ml-6 list-none">
                                {paragraph?.title}
                              </h3>

                              <div className="pl-2 -ml-6">
                                {/* Subsection Description */}
                                {paragraph?.description && (
                                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                    {paragraph.description}
                                  </p>
                                )}

                                {/* Nested Subsections */}
                                {paragraph?.subsections && (
                                  <ol className="space-y-2 list-decimal list-inside ml-4">
                                    {paragraph.subsections.map(
                                      (subItem, idx) => (
                                        <li
                                          key={idx}
                                          className="text-gray-600 text-lg leading-relaxed"
                                        >
                                          {subItem}
                                        </li>
                                      )
                                    )}
                                  </ol>
                                )}

                                {/* Subsection Content */}
                                {paragraph?.content && (
                                  <ul className="space-y-2">
                                    {paragraph.content.map(
                                      (contentItem, idx) => (
                                        <li
                                          key={idx}
                                          className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                                        >
                                          <span>{contentItem}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* Call to Action Section */}
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 text-xl font-semibold text-center mb-2">
              {productsData.callToAction}
            </p>
            <p className="text-purple-700 text-lg font-medium text-center">
              {productsData.downloadPrompt}
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

export default ProductsServices;
