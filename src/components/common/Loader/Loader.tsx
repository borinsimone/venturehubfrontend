import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = '#2196f3',
}) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '64px',
  };

  return (
    <div className='loader-container'>
      <div
        className='loader'
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Loader;
