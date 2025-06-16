import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="border-4 border-transparent border-t-4 border-white rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loading;