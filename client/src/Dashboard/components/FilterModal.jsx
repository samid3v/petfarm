import React from 'react';
import { useApp } from '../hooks/useApp';

const FilterModal = () => {
  const { showFilterModal, modalMessage } = useApp();

  return showFilterModal && (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="relative p-8 rounded-lg">
        {/* Your modal content goes here */}
        {modalMessage}
      </div>
    </div>
  );
};

export default FilterModal;
