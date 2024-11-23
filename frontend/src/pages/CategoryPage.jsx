import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryPlaces } from '../api/api';
import PlaceList from '../components/PlaceList';
import CitySelector from '../components/CitySelector';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('서울');

  // 카테고리 이름 매핑
  const getCategoryName = (id) => {
    const categoryMap = {
      'nature': '자연',
      'history': '역사',
      'festival': '축제/행사',
      'shopping': '쇼핑',
      'restaurant': '음식점'
    };
    return categoryMap[id] || id;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCategoryPlaces(selectedCity.toLowerCase(), categoryId, selectedSubCategory);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, selectedSubCategory, selectedCity]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>오류가 발생했습니다: {error}</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{getCategoryName(categoryId)}</h1>
        <CitySelector 
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />
        {data?.categories?.find(cat => cat.id === categoryId)?.subCategories && (
          <div className="subcategory-filters">
            <button 
              className={`filter-button ${!selectedSubCategory ? 'active' : ''}`}
              onClick={() => setSelectedSubCategory('')}
            >
              전체
            </button>
            {Object.entries(data.categories.find(cat => cat.id === categoryId).subCategories)
              .map(([key, sub]) => (
                <button
                  key={key}
                  className={`filter-button ${selectedSubCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedSubCategory(key)}
                >
                  {sub.label}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="category-content">
        {data?.recommendations && (
          <PlaceList places={data.recommendations} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;