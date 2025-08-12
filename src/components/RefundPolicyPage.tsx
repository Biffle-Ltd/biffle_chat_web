import React from "react";

// Extended data structure for multi-level sections and subsections
type Subsection = {
  subtitle?: string;
  paragraphs?: string[];
  list?: (string | string[])[];
};

type Section = {
  title: string;
  paragraphs?: string[];
  subsections?: Subsection[];
};

const refundPolicySections: Section[] = [
  {
    title: "Biffle - Refund Policy",
    paragraphs: [
      "Last Updated: April 8, 2025",
      "",
      'This Refund Policy ("Policy") governs the terms under which Biffle.ai ("Company," "we," "us," or "our") processes refunds for subscription fees, in-app purchases, or other paid services ("Services"). By purchasing any Service, you ("User," "you") agree to comply with this Policy.',
    ],
  },
  {
    title: "1. GENERAL REFUND PRINCIPLES",
    subsections: [
      {
        subtitle: "1.1 Subscription Services:",
        paragraphs: [
          "All subscription fees (monthly/annual) are non-refundable, except where required by applicable law.",
          "Cancellation stops future charges but does not entitle you to a refund for the current billing cycle.",
        ],
      },
      {
        subtitle:
          "1.2 One-Time Purchases (e.g., tips, pay-per-view content, call credits):",
        paragraphs: ["These are final and non-refundable, unless:"],
        list: [
          "The transaction was fraudulent or unauthorized.",
          "The Service was not delivered due to a technical error on our part.",
        ],
      },
      {
        subtitle: "1.3 Free Trials & Promotional Offers:",
        paragraphs: [
          "If you cancel before a free trial ends, no charges apply.",
          "Failure to cancel results in automatic conversion to a paid subscription, subject to this Policy.",
        ],
      },
    ],
  },
  {
    title: "2. ELIGIBILITY FOR REFUND REQUESTS",
    subsections: [
      {
        subtitle: "2.1 Valid Refund Requests:",
        paragraphs: ["Refunds may be considered only in the following cases:"],
        list: [
          "Duplicate charges (accidental multiple payments for the same service).",
          "Service failure (e.g., paid content not accessible due to a verified platform error).",
          "Unauthorized transactions (fraudulent use of your payment method).",
        ],
      },
      {
        subtitle: "2.2 Non-Refundable Circumstances:",
        paragraphs: ["No refunds will be granted for:"],
        list: [
          "Change of mind or dissatisfaction with content quality.",
          "Partial usage of a subscription period.",
          "Violations of our Terms of Use leading to account suspension/termination.",
        ],
      },
    ],
  },
  {
    title: "3. REFUND REQUEST PROCESS",
    subsections: [
      {
        subtitle: "3.1 How to Request:",
        paragraphs: [
          "Submit a refund request within 1 day of the charge via support@biffle.ai with:",
        ],
        list: [
          "Transaction ID.",
          "Reason for the request.",
          "Supporting evidence (e.g., screenshots of errors).",
        ],
      },
      {
        subtitle: "3.2 Processing Time:",
        paragraphs: [
          "Approved refunds will be processed within 14 business days to the original payment method.",
          "Refunds may appear in your account per your bank/payment provider's processing times.",
        ],
      },
    ],
  },
  {
    title: "4. CHARGEBACKS & DISPUTES",
    subsections: [
      {
        subtitle: "4.1 Chargeback Policy:",
        paragraphs: [
          'Disputing charges via your bank ("chargeback") without first contacting us may result in:',
        ],
        list: ["Immediate account suspension.", "A ban from future purchases."],
      },
      {
        subtitle: "4.2 Resolution:",
        list: [
          "We will investigate chargebacks and may provide evidence of Service delivery.",
          "Users agree to cooperate with our inquiries to resolve disputes.",
        ],
      },
    ],
  },
  {
    title: "5. GOVERNING LAW & DISPUTES",
    paragraphs: [
      "In all cases, you agree that disputes will be subject to the laws of India and the courts of Delhi shall have exclusive jurisdiction over all such disputes. Any disputes shall be resolved through negotiation or binding arbitration, waiving class-action claims.",
    ],
  },
  {
    title: "CONTACT:",
    paragraphs: [
      "You may contact the Grievance Officer at any of the following:",
      "____________________________",
      "Email: support@biffle.ai",
      "Address: BIFFLE (Sofnics Tech Labs Pvt. Ltd.)",
      "    3rd Floor, B-12, Kh No.82/9, Mahavir Enclave",
      "    New Delhi, South West Delhi, Delhi, 110045",
      "",
      "Note - Kindly send all user related grievances to the above mentioned email ID, in order for us to process and resolve the same in an expeditious manner",
    ],
  },
];

// Enhanced renderList to support nested lists
function renderList(list: (string | string[])[], level = 1) {
  return (
    <ul className={`space-y-2 px-4 pb-4 ${level > 1 ? "ml-6" : ""}`}>
      {list.map((item, idx) => {
        if (Array.isArray(item)) {
          return (
            <li key={idx} className="list-none p-0 m-0">
              {renderList(item, level + 1)}
            </li>
          );
        }
        const isPrice = typeof item === "string" && item.match(/INR|Price:/i);
        return (
          <li
            key={idx}
            className={`text-gray-600 text-lg flex items-start before:content-['•'] before:mr-2 before:text-gray-400 ${
              isPrice ? "font-medium text-green-700" : ""
            }`}
          >
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Refund Policy
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {refundPolicySections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors duration-200">
                {section.title}
              </h2>
              {section.paragraphs &&
                section.paragraphs.map((p: string, pidx: number) => (
                  <p key={pidx} className="text-gray-700 text-lg mb-2">
                    {p}
                  </p>
                ))}
              {section.subsections &&
                section.subsections.map((sub: Subsection, sidx: number) => (
                  <div key={sidx} className="mb-6 mt-4">
                    {sub.subtitle && (
                      <div className="bg-gray-50 rounded px-4 py-2 font-semibold text-gray-900 mb-3">
                        {sub.subtitle}
                      </div>
                    )}
                    {Array.isArray(sub.paragraphs) &&
                      sub.paragraphs.map((sp: string, spidx: number) => (
                        <p key={spidx} className="text-gray-700 text-lg mb-2">
                          {sp}
                        </p>
                      ))}
                    {sub.list && renderList(sub.list, 2)}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
