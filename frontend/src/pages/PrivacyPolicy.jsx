/** @format */

import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Header activeHeading={3} />
      <div className="w-11/12 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Last Updated: 2-September-2024</p>

        <p className="mb-4">
          At <b> OrderzShop </b>, we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, and safeguard your information.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          1. Information Collection
        </h2>
        <p className="mb-4">
          We may collect personal information from users and vendors, including
          but not limited to names, email addresses, contact details, and
          payment information.
        </p>

        <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
        <p className="mb-4">
          We use the information collected to facilitate transactions, improve
          our services, communicate with users, and comply with legal
          obligations.
        </p>

        <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your information
          from unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
        <p className="mb-4">
          OrderzShop uses cookies to enhance user experience. You can choose to
          accept or decline cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Third-Party Services</h2>
        <p className="mb-4">
          We may share your information with third-party service providers for
          the purposes of fulfilling orders and improving our services. These
          providers are obligated to protect your information.
        </p>

        <h2 className="text-2xl font-semibold mb-2">6. Children’s Privacy</h2>
        <p className="mb-4">
          OrderzShop does not knowingly collect information from children under
          13 years of age. If you believe we have collected such information,
          please contact us.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on our website.
        </p>

        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Terms of Service or Privacy
          Policy, please contact us at{" "}
          <a
            href="mailto:orderzshop.seller@gmail.com"
            className="text-[#256aff] font-bold">
            orderzshop.seller@gmail.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
