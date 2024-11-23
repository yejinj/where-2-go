import React, { useState, useEffect } from 'react';
import { getWeatherAndPlaces, getCategoryPlaces } from '../api/api';
import CitySelector from '../components/CitySelector';
import CategorySelector from '../components/CategorySelector';
import PlaceList from '../components/PlaceList';
import WeatherRecommendations from '../components/WeatherRecommendations';
import '../styles/MainPage.css';

const MainPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [categoryPlaces, setCategoryPlaces] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedCity) {
        setWeatherData(null);
        return;
      }

      try {
        setLoading(true);
        const result = await getWeatherAndPlaces(selectedCity);
        setWeatherData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  useEffect(() => {
    const fetchCategoryPlaces = async () => {
      if (!selectedCategory || !selectedCity) {
        setCategoryPlaces(null);
        return;
      }

      try {
        setLoading(true);
        const result = await getCategoryPlaces(selectedCity, selectedCategory);
        setCategoryPlaces(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPlaces();
  }, [selectedCity, selectedCategory]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedCategory(null);
    if (city) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="main-page">
      <div className="welcome-section">
        <h1 className="main-title">날씨 기반 관광지 추천</h1>
        <p className="subtitle">현재 날씨에 맞는 최적의 관광지를 추천해드립니다</p>
        
        <div className="selection-card">
          <div className="selector-box">
            <label className="selector-label">어디로 가시나요?</label>
            <div className="selector-content">
              <CitySelector 
                selectedCity={selectedCity}
                onCitySelect={handleCitySelect}
              />
            </div>
          </div>

          {step === 2 && (
            <div className="selector-box category-box">
              <label className="selector-label">어떤 곳을 찾으시나요?</label>
              <div className="selector-content">
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
            </div>
          )}

          {weatherData && selectedCity && (
            <div className="weather-info-box">
              <div className="weather-current">
                <span className="weather-temp">{weatherData.weather.temp}°C</span>
                <span className="weather-desc">{weatherData.weather.description}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p>오류가 발생했습니다: {error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      )}

      {weatherData && selectedCity && (
        <div className="weather-section">
          <WeatherRecommendations recommendations={weatherData.recommendations} />
        </div>
      )}

      {categoryPlaces && categoryPlaces.places && categoryPlaces.places.length > 0 && (
        <div className="category-section">
          <h3>{categoryPlaces.category} 추천 장소</h3>
          <PlaceList places={categoryPlaces.places} />
        </div>
      )}
    </div>
  );
};

export default MainPage;