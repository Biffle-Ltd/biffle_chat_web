import React from 'react';
import GenericPage from './GenericComponent';
import termsData from '../terms.json';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Terms of Service</h1>
        <GenericPage termsData={termsData} title="Terms of Service" />
      </div>
    </div>
  );
};

export default TermsPage; 