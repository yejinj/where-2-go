import React from 'react';
import '../styles/CategorySelector.css';

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    { id: null, name: "기본" },
    { id: "12", name: "🏛️ 관광지/자연" },
    { id: "14", name: "🎭 문화시설" },
    { id: "28", name: "🏃 레포츠" },
    { id: "38", name: "🛍️ 쇼핑" },
    { id: "39", name: "🍽️ 음식점" }
  ];

  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category.id || 'remove'}
          className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;