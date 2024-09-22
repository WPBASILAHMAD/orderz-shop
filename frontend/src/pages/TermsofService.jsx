/** @format */

import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="w-11/12 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">Last Updated: 22-September-2024</p>

        <p className="mb-4">
          Welcome to <b> OrderzShop </b> , a B2B platform connecting vendors and
          users. By accessing or using our website, you agree to comply with
          these Terms of Service. If you do not agree, please do not use our
          site.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using our services, you agree to these Terms and any additional
          terms provided.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          2. User Responsibilities
        </h2>
        <p className="mb-4">
          Users must provide accurate information and maintain the security of
          their accounts. You are responsible for any activity that occurs under
          your account.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          3. Vendor Responsibilities
        </h2>
        <p className="mb-4">
          Vendors must ensure that their products comply with applicable laws
          and regulations. OrderzShop does not endorse any vendor or product
          listed on our site.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, OrderzShop shall not be liable
          for any direct, indirect, incidental, special, or consequential
          damages arising from the use or inability to use the site, including
          damages caused by any vendor or user.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold OrderzShop harmless from any claims,
          losses, liabilities, damages, costs, or expenses arising out of your
          use of the site or violation of these Terms.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          6. Modification of Terms
        </h2>
        <p className="mb-4">
          OrderzShop reserves the right to modify these Terms at any time. Your
          continued use of the site constitutes acceptance of any changes.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
