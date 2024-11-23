import React from 'react';
import '../styles/PlaceList.css';

const PlaceList = ({ places }) => {
  const handleImageError = (e) => {
    const title = e.target.alt;
    const div = e.target.parentElement;
    div.classList.add('image-fallback');
    div.textContent = title;
  };

  return (
    <div className="place-list">
      {places.map(place => (
        <div key={place.id} className="place-card">
          <div className="place-image">
            <img 
              src={place.image} 
              alt={place.title}
              onError={handleImageError}
            />
          </div>
          <div className="place-info">
            <h4>{place.title}</h4>
            <p className="place-address">{place.address}</p>
            {place.tel && <p className="place-tel">{place.tel}</p>}
            {place.overview && (
              <p className="place-overview">
                {place.overview.length > 100 
                  ? `${place.overview.substring(0, 100)}...` 
                  : place.overview}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceList;