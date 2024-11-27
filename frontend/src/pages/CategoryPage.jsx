import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryPlaces } from '../api/api';
import PlaceList from '../components/PlaceList';
import CitySelector from '../components/CitySelector';
import '../styles/CategoryPage.css';

const CATEGORY_MAP = {
  'nature': '자연',
  'history': '역사',
  'festival': '축제/행사',
  'shopping': '쇼핑',
  'restaurant': '음식점'
};

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>데이터를 불러오는 중입니다...</p>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="error-container">
    <p>오류가 발생했습니다: {error}</p>
    <button onClick={() => window.location.reload()}>다시 시도</button>
  </div>
);

const SubCategoryFilters = ({ data, categoryId, selectedSubCategory, setSelectedSubCategory }) => {
  const subCategories = data?.categories?.find(cat => cat.id === categoryId)?.subCategories;
  
  if (!subCategories) return null;

  return (
    <div className="subcategory-filters">
      <button 
        className={`filter-button ${!selectedSubCategory ? 'active' : ''}`}
        onClick={() => setSelectedSubCategory('')}
      >
        전체
      </button>
      {Object.entries(subCategories).map(([key, sub]) => (
        <button
          key={key}
          className={`filter-button ${selectedSubCategory === key ? 'active' : ''}`}
          onClick={() => setSelectedSubCategory(key)}
        >
          {sub.label}
        </button>
      ))}
    </div>
  );
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('서울');

  const getCategoryName = (id) => CATEGORY_MAP[id] || id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const result = await getCategoryPlaces(
          selectedCity.toLowerCase(), 
          categoryId, 
          selectedSubCategory
        );
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err.message });
      }
    };

    fetchData();
  }, [categoryId, selectedSubCategory, selectedCity]);

  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage error={state.error} />;

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{getCategoryName(categoryId)}</h1>
        <CitySelector 
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />
        <SubCategoryFilters 
          data={state.data}
          categoryId={categoryId}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      </div>

      <div className="category-content">
        {state.data?.recommendations && (
          <PlaceList places={state.data.recommendations} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;