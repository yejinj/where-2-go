import React from 'react';
import '../styles/CitySelector.css';

const CitySelector = ({ selectedCity, onCitySelect }) => {
  const cities = [
    { id: "", name: "지역을 선택하세요" },
    { id: "서울", name: "서울특별시" },
    { id: "부산", name: "부산광역시" },
    { id: "인천", name: "인천광역시" },
    { id: "대구", name: "대구광역시" },
    { id: "광주", name: "광주광역시" },
    { id: "대전", name: "대전광역시" },
    { id: "울산", name: "울산광역시" },
    { id: "세종", name: "세종특별자치시" },
    { id: "제주", name: "제주특별자치도" }
  ];

  return (
    <select 
      value={selectedCity}
      onChange={(e) => onCitySelect(e.target.value)}
      className="city-selector"
    >
      {cities.map(city => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;