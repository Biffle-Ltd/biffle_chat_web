import React from "react";

// Type definitions for the data structure
interface Subsection {
  title?: string;
  description?: string;
  content?: string[];
  subsections?: string[];
}

interface Section {
  title: string;
  description?: string;
  content?: string[];
  subsections?: (string | Subsection)[];
}

interface TermsData {
  sections: Record<string, Section>;
  lastUpdated: string;
}

interface GenericPageProps {
  termsData: TermsData;
  title?: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({
  termsData,
  title,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Uncomment if you want to display the title */}
          {/* {title && (
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {title}
            </h1>
          )} */}

          {Object.entries(termsData.sections).map(([sectionKey, section]) => (
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
                    {section.content.map((paragraph: string, index: number) => (
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
                      {section.subsections.map(
                        (paragraph: string | Subsection, index: number) =>
                          typeof paragraph === "string" ? (
                            <li
                              key={index}
                              className="text-gray-600 text-lg leading-relaxed"
                            >
                              {paragraph}
                            </li>
                          ) : (
                            <li key={index} className="mb-4">
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
                                      (subItem: string, idx: number) => (
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
                                      (contentItem: string, idx: number) => (
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
                            </li>
                          )
                      )}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Divider and Last Updated */}
          <hr className="border-gray-200 mt-6 mb-4" />
          <p className="text-sm text-gray-500 text-center">
            Last Updated: {termsData.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;
