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

const termsSections: Section[] = [
  {
    title: "Terms of Use",
    paragraphs: [
      `These Terms of Use ("Terms") govern your use of Biffle.ai website and mobile applications (collectively, the "Platform") made available by Sofnics Tech Labs Pvt. Ltd. ("BIFFLE", "Company", "we", "us" and "our"), a private company established under the laws of India having its registered office at 3rd Floor, B-12, Kh No.82/9, Mahavir Enclave, New Delhi, South West Delhi, Delhi, 110045. The terms "you" and "your" refer to the user of the Platform.`,
      `If you do not agree with the terms and conditions of these Terms, please do not use this Platform.`,
      `You and we are required to follow certain rules while you use our Platform. We have listed these rules in this document. Please read these Terms and all other hyperlinks mentioned here carefully. Do remember that by using our Platform, you agree to these Terms.`,
    ],
  },
  {
    title: "Who May Use Our Services",
    subsections: [
      {
        paragraphs: [
          `Our Platform helps you connect with experts from different cultural references, age groups or gender with varied skills and expertise. You may want to create new friends or seeks some expert guidance on specific issue, Biffle expert creators are available to respond to your queries or requests. You may be charged for dedicated interaction with the creators depending on the skills and expertise of the creators you approach on the platform. ("Service/Services").`,
          `You may use our Services only if you are capable of forming a binding agreement with us and are legally permitted to use our Services. If you are accepting these Terms on behalf of a company or any legal persons, then you represent and warrant that you have the authority to bind such an entity to these Terms and effectively "you" and "your" shall refer to the company.`,
          `Please ensure that you are allowed to use our services under the law.`,
        ],
      },
    ],
  },
  {
    title: "How to Use Our Services",
    subsections: [
      {
        paragraphs: [
          `To use our Services, you must register on our Platform by entering your phone number and the One-Time-Password sent by us via SMS to your phone number. When you register with us using the BIFFLE website or mobile application, you also allow us to read your mobile device phone book, your SMS inbox, access your mobile gallery, mobile device storage, and mobile device camera for the services rendered on the platform. However, we do not read any information stored on your mobile device and computer without your permission.`,
          `In order to provide Services to you, we need to access certain features of your mobile device.`,
        ],
      },
    ],
  },
  {
    title: "Privacy Policy",
    subsections: [
      {
        paragraphs: [
          `To effectively provide and introduce any new Services to you, we collect certain information such as your phone number, your gender and your name from you. We may further request and store additional information. Such information is stored securely on amazon web services or "AWS'' cloud servers and the "Google Cloud Platform" cloud servers, thereby also subject to the terms of the AWS and Google Cloud privacy policy. The BIFFLE Privacy Policy explains how we collect, use, share and store the information collected. The BIFFLE Privacy Policy also details your rights under law and how you may control the data you provide us.`,
          `We have described how we store and use this information in the BIFFLE Privacy Policy.`,
        ],
      },
    ],
  },
  {
    title: "Coins Purchase and Refund Policy",
    subsections: [
      {
        paragraphs: [
          `You can now licence virtual gifts/digital goods (such as stickers, gifs, banners etc) to our users ("Gifts"). You can send such gifts by acquiring Coins ("Coins/Coin") using our authorised payment methods and through payment providers made available and authorised by us. Do note that Coins/Gifts cannot be exchanged for cash, or legal tender.`,
        ],
      },
      {
        subtitle: "Purchasing Coins",
        list: [
          `The price of the Coins will be displayed at the point of purchase. All charges and payments for Coins will be made in the currency specified at the point of purchase through the relevant payment mechanism as set out by us.`,
          `You will be responsible for the payment of any Coins purchased by you. Once your payment has been made, your user account will be credited with the number of Coins purchased.`,
          `Once the coins or any service is purchased successfully on the platform, it cannot be refunded in any manner`,
        ],
      },
      {
        subtitle: "Usage of Coins",
        list: [
          `Coins can be used to purchase store items that can be used by users to customise their profiles. Coins can also be used to buy gifts, frames, wallpapers and roses to various creators on the platform depending on the duration of conversation. Coins cannot be exchanged for cash, or legal tender, or currency of any state, region, or any political entity, or any other form of credit.`,
          `Coins can only be used on our Platform and as a part of our Services and cannot be combined or used in conjunction with other promotions, coupons, discounts or special offers, except those designated by us.`,
          `No Coins may be assigned or transferred to any other user of the Platform or any third party. The sale, barter, assignment, or other disposal of any Coins, other than by us, is expressly prohibited. Any violation of this restriction may result in termination of your account on the Platform, forfeiture of the Coins from your account, and/or you may be subject to liability for damages, litigation and transaction costs.`,
          `Accrued Coins do not constitute property and are not transferable: (i) upon death; (ii) as part of a domestic relations matter; or (iii) otherwise by operation of law.`,
          `You agree that we have the right to manage, regulate, control, modify and/or eliminate such Coins, where we have a valid reason to do so such as where we reasonably believe you have violated this Coins Policy, you are in breach of any applicable law or regulation or for legal, security or technical reasons and that we will have no liability to you based on our exercise of this right. If we decide to eliminate Coins from our Services completely, we will do so by providing reasonable notice to you.`,
        ],
      },
      {
        subtitle: "Purchasing Gifts",
        list: [
          `Gifts constitute a limited licence to certain features of digital products and services. The conversion/ redemption rate between each Coin and Gift will be displayed on our Platform.`,
          `Published prices include taxes where required under applicable laws of your jurisdiction.`,
          `You agree that we have the absolute right to manage, regulate, control, modify and/or eliminate such exchange rate as we deem fit in our sole discretion, in any general or specific case, and that we will have no liability to you based on our exercise of such right.`,
          `Except as otherwise set out in this Coin Policy, all conversions/ redemptions of Coins into Gifts are final. We do not offer refunds in any manner.`,
          `Gifts cannot be converted into or exchanged for Coins or cash or be refunded or reimbursed by us for any reason.`,
          `Gifts exchanged or received by any user do not constitute property and are not transferable: (i) upon death; (ii) as part of a domestic relations matter; or (iii) otherwise by operation of law.`,
          `We may replace previously exchanged copies of Gifts, if we determine in our sole discretion that the Gifts exchanged or received by a user are corrupted or otherwise damaged. We will not charge additional fees for reissuing a corrupted or otherwise damaged Gift.`,
          `We reserve the right to terminate or take any other appropriate action against you if you are deemed to be abusing the Coins Feature or you are in breach of this Coins Policy.`,
          `You are not permitted to use any Gift or Coin in lieu of receipt of any goods or services from any user on the Platform or otherwise.`,
        ],
      },
    ],
  },
  {
    title: "Subscription Policy",
    subsections: [
      {
        subtitle: "Benefits",
        list: [
          `As a Biffle.ai premium subscriber, you unlock exclusive perks, including:`,
          `Additional bonus on every coin pack purchase - Subscribers get an additional discount/bonus depending on the subscription plan on every coin pack purchase.`,
          `Exclusive Content: Unlocked access to paywalled posts, short videos, and exclusive chats with verified expert creators.`,
          `Private Messaging: Priority messaging privileges with participating creators, subject to their availability.`,
          `VIP Treatment: Subscribers also receive personalized interactions (e.g., shoutouts, early access) at creators’ discretion and availability.`,
        ],
      },
      {
        subtitle: "Restrictions",
        list: [
          `Benefits are non-transferable and limited to the Subscriber’s account.`,
          `Sharing login credentials to circumvent paywalls is prohibited and grounds for termination.`,
        ],
      },
      {
        subtitle: "Fees & payment terms",
        list: [
          `Subscription Tiers: Fees vary by plan (monthly/quarterly/annual) and are displayed on the app at checkout.`,
          `Auto-Renewal: Subscriptions automatically renew at the end of each Billing Cycle unless canceled by the user.`,
          `Taxes: Fees are Inclusive of applicable taxes.`,
        ],
      },
      {
        subtitle: "Cancellation & refunds",
        list: [
          `Cancellation: You may cancel your subscription via the payment partner chosen at the time of transaction or email the request at care@biffle.ai. Access continues until the current Billing Cycle ends.`,
          `Refunds: Except as required by law, all fees are non-refundable, including for partial use or unused benefits.`,
        ],
      },
      {
        subtitle: "Modification & termination",
        list: [
          `Changes: We reserve the right to modify fees or features with 30 days’ notice via email or in-app alert. Continued use constitutes acceptance.`,
          `Termination: We may suspend or terminate subscriptions for:`,
          `(a) Violations of our Terms of Use;`,
          `(b) Fraudulent activity; or`,
          `(c) Non-payment.`,
        ],
      },
    ],
  },
  {
    title: "Note to Users",
    subsections: [
      {
        list: [
          `Coins/ Gifts are not treated as individual goods to be purchased by users but as licensed access to items issued by the Platform.`,
          `Coins and Gifts associated with your account will be extinguished once you delete your account from our Platform.`,
          `Coins cannot be used for trading on the internet.`,
          `You are solely responsible for the Coins/ Gifts you purchase on the Platform and you agree that we will have no liability or responsibility with respect to such Coins/ Gifts.`,
          `We reserve the right to determine in our sole discretion as to what constitutes a violation.`,
          `We reserve the right, in our sole discretion, to change portions of this Coins Policy at any time. If we do this, we will post the changes on this page and will indicate at the top of this page the date on which these terms were last updated.`,
        ],
      },
    ],
  },
  {
    title: "Your Commitments",
    subsections: [
      {
        paragraphs: [
          `Please note that you will solely bear the costs and consequences of any actions taken by you on the BIFFLE Platform (including any violation of these Terms) along with the commitments given by you below. By using our Services, you agree and acknowledge the following:`,
        ],
      },
      {
        subtitle: "a. No Impersonation or False Information to be Provided",
        list: [
          `While you do not have to use your actual name on our Platform, you are required to input your correct phone number and gender to use our Services. You will not falsely represent yourself as another person or representative of another person to use our Services.`,
        ],
      },
      {
        subtitle: "b. Device Security:",
        list: [
          `We have implemented measures to ensure that our Platform is secure. However, there is no guarantee that our Platform is immune to hacking and virus attacks. You will ensure that you have requisite anti-malware and antivirus software on your mobile device and computer to ensure its safety. You will not allow multiple accounts to be linked to your profile through any means, including but not limited to your phone number, PAN number, IP address, UPI ID, bank account number, etc. You will be responsible for all content posted by any account linked through these means.`,
        ],
      },
      {
        subtitle: "c. Content Removal and Termination:",
        list: [
          `Your usage of our Platform is governed by the BIFFLE Content and Community Guidelines. If any of our users report your content which violates the BIFFLE Content Community Guidelines, we may remove such content from our Platform. In the event that multiple reports are made regarding violation of the BIFFLE Content and Community Guidelines, we may be compelled to terminate your account with us and block you from registering with us. We reserve the right to update these community guidelines at any point as required to ensure the safety of users on the platform. By agreeing to our terms, if you are found in violation of any of our community guidelines, we reserve the right to block your account and any accounts created by you thereafter. In such cases, all your coins or gifts, redeemed or otherwise, will be forfeited and nullified.`,
        ],
      },
      {
        subtitle: "d. Platform Not to be Used For Anything Unlawful or Illegal",
        list: [
          `You shall not, however, use our Platform to share any content which is obscene, pornographic, harmful for minors, discriminatory, spreading what may be considered as hate speech, inciting any form of violence or hatred against any persons, or violates any laws of India, or is barred from being shared by any laws of India. We reserve the right to remove such content. Please read the BIFFLE Content and Community Guidelines for further details.`,
          `In addition to the above, please note that we may share your information with appropriate law enforcement authorities if we have good-faith belief that it is reasonably necessary to share your personal data or information in order to comply with any legal obligation or any government request; or to protect the rights or prevent any harm to our property or safety, our customers, or public; or to detect, prevent or otherwise address public safety, fraud, security or technical issues. You understand however, that we cannot be held responsible for any actions done by or to you by a third party or user by way of using our Platform.`,
          `We have developed a platform for people to engage in amazing social experiences; please do not share any content which is illegal or causes any harm to the well-being of members of the society or community.`,
        ],
      },
      {
        subtitle: "e. Content Rights and Liabilities",
        list: [
          `We strongly believe in the freedom of expression and allow you to share photographs, images, videos, music, status updates, and other content on our Platform. We do not have any ownership over any of the content shared by you and the rights in the content remain only with you. You will not use our Platform to violate or infringe upon our or any third-party’s intellectual property rights. Such content is against BIFFLE Content and Community Guidelines and may be removed from the Platform. Further, if you use any content developed by us, then we shall continue to own the intellectual property rights vested in such content.`,
          `By creating/sharing/posting/uploading content using our Services, you grant us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide licence to host, use, distribute, run, copy, publicly perform or display, translate, and create derivative works of your content (consistent with your privacy and application settings). You may delete your content and/or account at any point. However, your content may continue to appear on the Platform if it has been shared with others. To learn more about how we use information, and how to control or delete your content, please read the BIFFLE Privacy Policy.`,
          `You remain solely responsible for the content you post on our Platform. We do not endorse and are not responsible for any content shared or posted on or through our Platform, and for any consequences resulting out of such sharing or posting. The presence of our logo or any trademark on any content shared by you does not mean that we have endorsed or sponsored your content. Further, we will not be liable for or responsible for the consequences of any transactions made or entered into by you with other users of the Platform or advertisers on the Platform.`,
          `You will always have ownership and responsibilities for the content you share. We will never claim that we have intellectual property rights over your content, but we will have a zero cost, permanent licence to use what you share and post on our Platform.`,
        ],
      },
      {
        subtitle: "f. Intermediary Status and No Liability",
        list: [
          `We are an intermediary as defined under the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. These Terms are published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 that require publishing of the rules and regulations, BIFFLE Privacy Policy, and BIFFLE Terms of Use for accessing and using our Platform. Our role is limited to providing a platform for users to upload, share and display content, created or shared by you and other users.`,
          `We do not control what you or other people may or may not do on the Platform and are thus, not responsible for the consequences of such actions (whether online or offline). We are not responsible for services and features offered by others, even if you access them through our Services. Our responsibility for anything that happens on our Platform is strictly governed by the laws of India and is limited to that extent. You agree that we will not be responsible for any loss of profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive, or incidental damages arising to you or any other person related to these Terms, even if we know they are possible. This includes when we delete your content, information, or account.`,
          `We are an intermediary under Indian law. We do not control what people post on our Platform but we expect everyone to comply with the BIFFLE Content and Community Guidelines.`,
        ],
      },
      {
        subtitle:
          "g. You Will Not Attempt to Disrupt or Jeopardise BIFFLE services",
        list: [
          `We have developed a community-driven platform. Therefore, you agree to not interfere with, or use non-public areas of our Platform, Services, and our technical delivery system. You will not introduce any trojans, viruses, any other malicious software, any bots or scrape our Platform for any user information. Additionally, you will not probe, scan, or test the vulnerability of any system, security or authentication measures implemented by us. If you tamper or attempt to tamper with our technological design and architecture, we will terminate your user profile and ban you from using our services.. We may further report such actions to the appropriate law enforcement authorities and proceed against you with legal actions.`,
          `You will not hack into or introduce malicious software of any kind onto our Platform. If you commit such actions, we may remove you from the platform and may report your actions to the police and/or relevant legal authorities.`,
        ],
      },
    ],
  },
  {
    title: "Permissions You Give To Us",
    subsections: [
      {
        list: [
          `You accept these Terms and give us certain permissions so that we can serve you better. Permissions you grant to us are:`,
        ],
      },
      {
        subtitle: "a. Automatic Downloads and Updates",
        list: [
          `We are constantly updating our Platform and Services offered. To use our Platform, you need to login on www.biffle.ai/login or you may also download the BIFFLE mobile application to your mobile device and update it from time to time.`,
          `Applications and software are constantly updated for your use and you will need to install the latest version of the BIFFLE mobile application to your mobile device each time such update is generated`,
        ],
      },
      {
        subtitle: "b. Permission to Use Cookies",
        list: [
          `We may use cookies, pixel tags, web beacons, mobile device IDs, flash cookies and similar files or technologies to collect and store information with respect to your use of the Services and third-party websites. Please see the BIFFLE Cookie Policy for more information regarding the use of cookies and other technologies described in this section, including regarding your choices relating to such technologies.`,
          `All websites use cookies and store them on your web browser so that usage information can be stored and logged in your browser. For more details, please read the BIFFLE Cookie Policy.`,
        ],
      },
      {
        subtitle: "c. Data Retention",
        list: [
          `We shall have the right to retain certain information regarding your usage of the Platform. Please view the BIFFLE Privacy Policy for further information relating to the collection, processing, storage and use of your information by us.`,
          `You grant us the right to process, store and retain information relating to you and provided by you. Please see the Privacy Policy for further information.`,
        ],
      },
    ],
  },
  {
    title: "Service Modification and Updates",
    subsections: [
      {
        paragraphs: [
          `We continuously evolve our Platform to enhance user experience and meet changing demands. Accordingly, we reserve the right to:`,
        ],
        list: [
          [
            `Modify, suspend, or discontinue any service, feature, or functionality at any time without prior notice`,
            `Introduce new features or remove existing ones at our sole discretion`,
            `Implement temporary service interruptions for maintenance or upgrades`,
          ],
        ],
      },
      {
        paragraphs: [
          `While we typically make these changes to improve our Platform, we will:`,
        ],
        list: [
          [
            `Seek your explicit consent when legally required for material changes`,
          ],
        ],
      },
      {
        list: [
          [
            `Provide reasonable notice for significant modifications affecting your use of core services`,
            `Maintain this page as the authoritative source for all updates`,
          ],
        ],
      },
      {
        paragraphs: [
          `We encourage you to periodically review these Terms to stay informed about any changes. Your continued use of the Platform following modifications constitutes acceptance of the updated Terms.`,
        ],
      },
      {
        paragraphs: [`Note that we are not liable for:`],
        list: [
          [
            `Any inconvenience caused by service modifications`,
            `Features that may become unavailable`,
            `Third-party integrations that may be affected by our changes`,
          ],
        ],
      },
      {
        paragraphs: [
          `This flexibility is essential to maintaining an innovative and secure platform for all users.`,
        ],
      },
    ],
  },
  {
    title: "Our Agreement and What Happens If We Disagree",
    subsections: [
      {
        subtitle: "a. Who Has Rights Under These Terms",
        list: [
          `The rights and obligations under these Terms are granted only to you and shall not be assigned to any third party without our consent. However, we are permitted to assign our rights and obligations under these Terms to others. This can happen when, for example, we enter into a merger with another company and create a new company.`,
        ],
      },
      {
        subtitle: "b. How Will We Handle Disputes",
        list: [
          `In all cases, you agree that disputes will be subject to the laws of India and the courts of Delhi shall have exclusive jurisdiction over all such disputes.`,
        ],
      },
    ],
  },
  {
    title: "Grievance Redressal Mechanism",
    subsections: [
      {
        paragraphs: [
          `As part of our commitment to the privacy and safety of our users, we continue to work alongside the government authorities in order to keep our users safe. We have appointed a Grievance Officer, who can be contacted directly if a user has a concern about their BIFFLE experience. We have put together a robust Grievance Redressal Mechanism in place to help resolve any concerns or complaints raised by you with respect to BIFFLE.`,
        ],
      },
      {
        subtitle: "Various mechanisms for grievance redressal are given below:",
        list: [
          [
            "You can report user profiles and raise complaints for content which violate our community guidelines. You can select the appropriate reason and click on the report option",
          ],
          [
            "You can send an email to care@BIFFLE.app with your concern or complaint.",
          ],
        ],
      },
      {
        paragraphs: [
          "You can also contact the Grievance Officer in relation to the following policies, or any other concerns that you may have with respect to:",
        ],
        list: [
          [
            "BIFFLE Terms of Service",
            "BIFFLE Privacy policy",
            "Questions about your account",
          ],
        ],
      },
      {
        paragraphs: [
          "We have a Grievance Officer to address your concerns regarding data safety, privacy, and Platform usage concerns. We will resolve the issues raised by you within 45 (forty-five) days from receiving them. We have created a method for you to get in touch with us and for us to address your concerns.",
        ],
      },
      {
        subtitle:
          "You may contact the Grievance Officer at any of the following:",
        paragraphs: [
          "____________________________",
          "Email: support@biffle.ai",
          "Address: BIFFLE (Sofnics Tech Labs Pvt. Ltd.)",
          "3rd Floor, B-12, Kh No.82/9, Mahavir Enclave",
          "New Delhi, South West Delhi, Delhi, 110045",
          "Note - Kindly send all user related grievances to the above mentioned email ID, in order for us to process and resolve the same in an expeditious manner",
        ],
      },
    ],
  },
  {
    title: "Limitation of Liability",
    subsections: [
      {
        list: [
          `We do not assume any liability with respect to any loss or damage, arising directly or indirectly due to any inaccuracy or incompleteness of any information or a breach of any warranty or guarantee due to the actions of any user of the Platform.`,
          `The Platform and Services are provided on "as is" and "as available" basis without any representation or warranties, express or implied except otherwise specified in writing. We do not warrant the quality of the Services or the Platform including its uninterrupted, timely, secure or error-free provision, continued compatibility on any device, or correction of any errors.`,
          `In no event shall we, or any of our affiliates, successors, and assigns, and each of their respective investors, directors, officers, employees, agents, service providers, and suppliers be liable for any special, incidental, punitive, direct, indirect or consequential damages suffered as a consequence of a breach of the Terms by another user or arising out of the use of or the reliance on any of the Services or the Platform.`,
          `In the event any exclusion contained herein is held to be invalid for any reason and we or any of our affiliate entities, officers, directors or employees become liable for loss or damage, then, any such liability shall be limited to not exceeding the charges or amounts paid to us for use of the Platform or the Services in the month preceding the date of the claim.`,
          `· If the Company or substantially all of its assets are acquired by a third party, in which case personal data held by it about its customers will be one of the transferred assets. If we are involved in a merger, acquisition, bankruptcy, reorganization or sale of assets such that your information would be transferred or become subject to a different Privacy Policy, we will notify you in advance so you can opt out of any such new policy by deleting your account before transfer.`,
        ],
      },
    ],
  },
  {
    title: "Indemnification",
    subsections: [
      {
        list: [
          `You agree to indemnify, defend and hold harmless us, and our subsidiaries, affiliates and agents and their respective officers, directors, employees, successors and assigns from and against any claim, proceeding, loss, damage, liability, cost, demand or expense (including but not limited to attorney's fees) of any kind arising out of:`,
          `(i) your access to or use of the Platform and Services;`,
          `(ii) any breach by you of your obligations under this Agreement;`,
          `(iii) your violation of the rights of any third party, including any infringement of intellectual property, or of any privacy or consumer protection right;`,
          `(iv) any violation of law or contractual obligation and any claims, demands, notices pursuant to such violation;`,
          `(v) your negligence or willful misconduct.`,
          `This obligation will survive the termination of our Terms.`,
        ],
      },
    ],
  },
  {
    title: "Unsolicited Material",
    subsections: [
      {
        list: [
          `We always appreciate feedback or other suggestions. We may use the same without any restrictions or obligation to compensate you for them and are under no obligation to keep them confidential.`,
        ],
      },
    ],
  },
  {
    title: "General",
    subsections: [
      {
        list: [
          `If any aspect of these Terms is unenforceable, the rest will remain in effect.`,
          `Any amendment or waiver to our Terms must be in writing and signed by us.`,
          `If we fail to enforce any aspect of these Terms, including reporting any illegal or impermissible actions to appropriate law enforcement authorities or blocking or suspending your profile, such failure to enforce our rights will not be a waiver by us.`,
          `We reserve all rights not expressly granted to you.`,
        ],
      },
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

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Terms of Use
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {termsSections.map((section, idx) => (
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

export default TermsPage;
