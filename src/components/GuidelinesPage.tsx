import React from 'react';
import GenericPage from './GenericComponent';
import guidelinesData from '../constants/guidelines.json';

const GuidelinesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Community Guidelines</h1>
        <GenericPage termsData={guidelinesData} title="Community Guidelines" />
      </div>
    </div>
  );
};

export default GuidelinesPage; 