import React from 'react';
import '../styles/WeatherRecommendations.css';

const WeatherRecommendations = ({ recommendations }) => {
  const handleImageError = (e) => {
    const title = e.target.alt;
    const div = e.target.parentElement;
    div.classList.add('image-fallback');
    div.textContent = title;
  };

  return (
    <div className="weather-recommendations">
      <h3>날씨 기반 추천</h3>
      <div className="recommendations-grid">
        {recommendations.map(place => (
          <div key={place.id} className="recommendation-card">
            <div className="recommendation-image">
              <img 
                src={place.image} 
                alt={place.title}
                onError={handleImageError}
              />
            </div>
            <div className="recommendation-info">
              <h4>{place.title}</h4>
              <p className="recommendation-category">{place.category}</p>
              <p className="recommendation-reason">{place.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherRecommendations;