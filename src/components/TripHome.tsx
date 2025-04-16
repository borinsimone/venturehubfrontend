import React from 'react';

const TripHome = ({ arrayName }) => {
  return (
    <div>
      {/* Other components or JSX */}

      {arrayName && arrayName.length > 0 ? (
        arrayName.map((item) => (
          <div key={item.id}>{/* Your mapping logic */}</div>
        ))
      ) : (
        <p>No items found</p>
      )}

      {/* Other components or JSX */}
    </div>
  );
};

export default TripHome;
