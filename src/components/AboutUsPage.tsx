import React from "react";

const AboutUs = () => {
  const aboutUsData = {
    aboutUs: {
      heading: "About Us",
      tagline: "Connecting Worlds, One Call at a Time",
      introduction:
        "At Biffle, we're redefining digital connections by bringing creators and fans together through meaningful one-on-one interactions. Born from the belief that authentic connections matter, our platform bridges the gap between individuals seeking inspiration and the creators who inspire them.",
      mission: {
        heading: "Our Mission",
        content:
          "We're on a mission to create a vibrant ecosystem where genuine human connections flourish. Biffle provides a safe, secure, and engaging environment for users to connect with creators, influencers, and experts across the globe through personalized video interactions, direct messaging, and exclusive content.",
      },
      uniqueValue: {
        heading: "What Makes Us Different",
        content:
          "Unlike traditional social platforms that prioritize mass engagement, Biffle focuses on quality connections. Our platform empowers creators to share their knowledge, talents, and perspectives while allowing fans to enjoy personalized experiences that simply aren't possible elsewhere.",
        features: [
          "✅ Verified & Trusted Experts – Every creator on Biffle.ai is carefully vetted to ensure credibility and quality.",
          "✅ Safe & Secure Interactions – We prioritize user safety with robust moderation and privacy controls.",
          "✅ Meaningful Engagement – Beyond passive content consumption, we foster real conversations and learning experiences.",
          "✅ Global & Diverse Perspectives – Connect with professionals and creators from different cultures, industries, and fields.",
          "✅ Premium, Ad-Free Experience – Focus on high-value content without distractions.",
        ],
      },
      forCreators: {
        heading: "For Creators",
        content:
          "Biffle provides creators with innovative ways to monetize their expertise and build deeper relationships with their audience. Our platform offers multiple revenue streams through private calls, exclusive content, live streaming, and direct fan support via tips and gifts.",
      },
      forUsers: {
        heading: "For Users",
        content:
          "Whether you're seeking inspiration, entertainment, learning opportunities, or meaningful connections, Biffle gives you unprecedented access to the creators who matter to you. Our premium membership unlocks a world of exclusive benefits, from discounted call rates to priority messaging access.",
      },
      community: {
        heading: "Join Our Community",
        content:
          "Biffle is more than a platform—it's a growing community of passionate individuals sharing knowledge, inspiration, and authentic moments. We invite you to experience the future of social connection, where every interaction has the potential to inspire, educate, and transform.",
      },
      slogan: "Biffle: Where connections become conversations.",
    },
  };

  const { aboutUs } = aboutUsData;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {aboutUs.heading}
          </h1>

          {/* Tagline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.tagline}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.introduction}
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.mission.heading}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.mission.content}
              </p>
            </div>
          </div>

          {/* What Makes Us Different Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.uniqueValue.heading}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.uniqueValue.content}
              </p>
              <ul className="space-y-2">
                {aboutUs.uniqueValue.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400"
                  >
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* For Creators Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.forCreators.heading}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.forCreators.content}
              </p>
            </div>
          </div>

          {/* For Users Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.forUsers.heading}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.forUsers.content}
              </p>
            </div>
          </div>

          {/* Community Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
              {aboutUs.community.heading}
            </h2>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {aboutUs.community.content}
              </p>
            </div>
          </div>

          {/* Slogan */}
          <div className="mb-8">
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed text-center font-medium italic">
                {aboutUs.slogan}
              </p>
            </div>
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

export default AboutUs;
