import React from 'react';
import GenericPage from './GenericComponent';
import privacyData from '../constants/privacy.json';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Privacy Policy</h1>
        <GenericPage termsData={privacyData} title="Privacy Policy" />
      </div>
    </div>
  );
};

export default PrivacyPage; 