import React from 'react';
import '../styles/WeatherInfo.css';

const WeatherInfo = ({ weather }) => {
  // 날씨 아이콘 매핑
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '🌨️';
      default:
        return '🌤️';
    }
  };

  // 온도에 따른 스타일 클래스
  const getTempClass = (temp) => {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 20) return 'temp-warm';
    if (temp >= 10) return 'temp-mild';
    return 'temp-cold';
  };

  return (
    <div className="weather-info">
      <div className="weather-main">
        <span className="weather-icon">
          {getWeatherIcon(weather.condition)}
        </span>
        <div className={`weather-temp ${getTempClass(weather.temp)}`}>
          {Math.round(weather.temp)}°C
        </div>
      </div>
      
      <div className="weather-details">
        <p className="weather-description">
          {weather.description}
        </p>
        <p className="weather-recommendation">
          {weather.temp >= 30 && '더운 날씨네요! 실내 활동을 추천드려요.'}
          {weather.temp >= 20 && weather.temp < 30 && '야외 활동하기 좋은 날씨예요!'}
          {weather.temp >= 10 && weather.temp < 20 && '산책하기 좋은 날씨네요.'}
          {weather.temp < 10 && '추운 날씨네요! 따뜻하게 입고 나가세요.'}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;