import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary`}></div>
    </div>
  );
};

export default Loader;
