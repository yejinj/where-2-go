import React from 'react';
import '../styles/PlaceCard.css';

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <div className="place-image">
        <img 
          src={place.image || '/default-place.jpg'} 
          alt={place.title}
          onError={(e) => {
            e.target.src = '/default-place.jpg';
          }}
        />
      </div>
      <div className="place-info">
        <h3 className="place-title">{place.title}</h3>
        <p className="place-address">{place.addr}</p>
        <p className="place-tel">{place.tel}</p>
        <div className="place-categories">
          <span className="category-badge">{place.category}</span>
          {place.subCategory && (
            <span className="subcategory-badge">{place.subCategory}</span>
          )}
        </div>
        <div className="place-hashtags">
          {place.hashtags?.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;