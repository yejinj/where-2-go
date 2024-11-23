import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/CategoryList.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const CategoryList = ({ categories, weather }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filterOptions = [
    { id: 'all', label: '전체' },
    { id: 'indoor', label: '실내' },
    { id: 'outdoor', label: '실외' },
    { id: 'recommended', label: '추천' }
  ];

  const sortOptions = [
    { id: 'recommended', label: '추천순' },
    { id: 'name', label: '이름순' }
  ];

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  const getRecommendation = (category) => {
    const season = getCurrentSeason();
    const temp = weather?.temp || 20;
    const condition = weather?.condition || 'Clear';

    const isGoodWeather = ['Clear', 'Clouds'].includes(condition);
    const isRainy = ['Rain', 'Drizzle'].includes(condition);
    const isSnowy = condition === 'Snow';

    switch (category.id) {
      case 'nature':
        if (isGoodWeather && temp >= 15 && temp <= 28) {
          return { recommended: true, reason: '날씨가 좋아 야외 활동하기 좋아요!' };
        }
        break;
      case 'culture':
        if (isRainy || temp >= 30 || temp <= 5) {
          return { recommended: true, reason: '실내 활동하기 좋은 날씨네요.' };
        }
        break;
      case 'festival':
        if (isGoodWeather && temp >= 18 && temp <= 27) {
          return { recommended: true, reason: '축제 즐기기 좋은 날씨예요!' };
        }
        break;
      default:
        return null;
    }

    const seasonalRecommendations = {
      spring: ['nature', 'festival'],
      summer: ['water', 'culture'],
      autumn: ['nature', 'festival'],
      winter: ['culture', 'shopping']
    };

    if (seasonalRecommendations[season]?.includes(category.id)) {
      return { 
        recommended: true, 
        reason: `${season === 'spring' ? '봄' : season === 'summer' ? '여름' : season === 'autumn' ? '가을' : '겨울'}에 추천하는 카테고리입니다!` 
      };
    }

    return null;
  };

  const filteredCategories = useMemo(() => {
    return categories
      .filter(category => {
        const matchesSearch = 
          category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(category.subCategories)
            .some(sub => sub.label.toLowerCase().includes(searchTerm.toLowerCase())) ||
          Object.values(category.subCategories)
            .some(sub => sub.hashtags.some(tag => 
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ));

        const matchesFilter = 
          activeFilter === 'all' ? true :
          activeFilter === 'indoor' ? ['culture', 'shopping'].includes(category.id) :
          activeFilter === 'outdoor' ? ['nature', 'festival'].includes(category.id) :
          activeFilter === 'recommended' ? getRecommendation(category)?.recommended : true;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          const aRec = getRecommendation(a)?.recommended || false;
          const bRec = getRecommendation(b)?.recommended || false;
          return bRec - aRec;
        }
        return a.label.localeCompare(b.label);
      });
  }, [categories, searchTerm, activeFilter, sortBy]);

  return (
    <div className="category-container">
      <div className="category-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="카테고리, 해시태그 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="filter-options">
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`filter-button ${activeFilter === option.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="sort-options">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <motion.div
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>검색 결과가 없습니다.</p>
          <button 
            className="reset-search"
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
              setSortBy('recommended');
            }}
          >
            필터 초기화
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="category-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.map((category) => {
            const recommendation = getRecommendation(category);
            
            return (
              <motion.div 
                key={category.id} 
                className={`category-item ${recommendation?.recommended ? 'recommended' : ''}`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/category/${category.id}`} className="category-link">
                  <div className="category-header">
                    <motion.h3 
                      className="category-title"
                      whileHover={{ color: '#3498db' }}
                    >
                      {category.label}
                    </motion.h3>
                    {recommendation?.recommended && (
                      <motion.div 
                        className="recommendation-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        추천
                      </motion.div>
                    )}
                  </div>
                  {recommendation?.recommended && (
                    <motion.p 
                      className="recommendation-reason"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {recommendation.reason}
                    </motion.p>
                  )}
                  <motion.div 
                    className="subcategories"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {Object.values(category.subCategories).map((sub) => (
                      <motion.span 
                        key={sub.code} 
                        className="subcategory-tag"
                        whileHover={{ 
                          backgroundColor: '#e0e0e0',
                          scale: 1.05
                        }}
                      >
                        {sub.label}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.div 
                    className="hashtags"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {Object.values(category.subCategories)[0].hashtags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="hashtag"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;