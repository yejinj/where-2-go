import React from 'react';
import '../styles/PlaceList.css';

const PlaceCard = ({ place }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.parentElement.classList.add('image-fallback');
    e.target.parentElement.textContent = place.title;
  };

  const truncateOverview = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="place-card">
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
          <p className="place-overview">{truncateOverview(place.overview)}</p>
        )}
      </div>
    </div>
  );
};

const PlaceList = ({ places }) => (
  <div className="place-list">
    {places.map(place => <PlaceCard key={place.id} place={place} />)}
  </div>
);

export default PlaceList;