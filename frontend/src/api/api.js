const API_BASE_URL = 'http://localhost:8080/api';

// 날씨와 추천 장소 함께 조회
export const getWeatherAndPlaces = async (city) => {
  try {
    const url = `${API_BASE_URL}/weather/${city}`;
    console.log('Requesting URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('날씨와 추천 장소 정보를 가져오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 카테고리별 장소 조회
export const getCategoryPlaces = async (city, categoryId) => {
  try {
    const url = `${API_BASE_URL}/weather/${city}/category/${categoryId}`;
    console.log('Requesting Category URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('카테고리별 장소 정보를 가져오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const apiService = {
  getWeatherAndPlaces,
  getCategoryPlaces
};

export default apiService;