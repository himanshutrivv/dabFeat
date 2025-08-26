import React from 'react';
import { LoaderContainer, LoaderSpinner } from '../dashboard/style';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  return (
    <LoaderContainer>
      <LoaderSpinner size={size} />
    </LoaderContainer>
  );
};

export default Loader;
