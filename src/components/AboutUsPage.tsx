import React from 'react';
import GenericPage from './GenericComponent';
import aboutData from '../constants/about.json';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>
        <GenericPage termsData={aboutData} title="About Biffle" />
      </div>
    </div>
  );
};

export default AboutUsPage; 