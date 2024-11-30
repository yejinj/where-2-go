import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryPlaces } from '../api/api';
import PlaceList from '../components/PlaceList';
import CitySelector from '../components/CitySelector';
import CategorySelector from '../components/CategorySelector';
import '../styles/CategoryPage.css';

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>데이터를 불러오는 중입니다...</p>
  </div>
);

const ErrorMessage = ({ error }) => {
  ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired
  };
  
  return (
    <div className="error-container">
      <p>오류가 발생했습니다: {error}</p>
      <button onClick={() => window.location.reload()}>다시 시도</button>
    </div>
  );
};

const SubCategoryFilters = ({ data, categoryId, selectedSubCategory, setSelectedSubCategory }) => {
  SubCategoryFilters.propTypes = {
    data: PropTypes.object,
    categoryId: PropTypes.string.isRequired,
    selectedSubCategory: PropTypes.string.isRequired,
    setSelectedSubCategory: PropTypes.func.isRequired
  };

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

  const getCategoryName = (id) => {
    const category = CategorySelector.categories?.find(cat => cat.id === id);
    return category ? category.name : id;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const result = await getCategoryPlaces(
          selectedCity.toLowerCase(), 
          categoryId, 
          selectedSubCategory
        );
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setState({ data: null, loading: false, error: err.message });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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