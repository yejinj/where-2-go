const express = require('express');
const router = express.Router();
const axios = require('axios');
const { areaCodeMap } = require('../utils/areaCode');
const { weatherToContentType, categoryTypes } = require('../utils/tourCategory');
const { getTourSpots } = require('../services/tourApi');

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityNameMap = {
    '서울': 'Seoul,KR',
    '부산': 'Busan,KR',
    '인천': 'Incheon,KR',
    '대구': 'Daegu,KR',
    '광주': 'Gwangju,KR',
    '대전': 'Daejeon,KR',
    '울산': 'Ulsan,KR',
    '세종': 'Sejong,KR',
    '제주': 'Jeju,KR'
};

// 날씨 기반 추천 (작은 카드형)
router.get('/:city', async (req, res) => {
    try {
        const { city } = req.params;
        
        console.log('Request received for city:', city);
        
        const englishCityName = cityNameMap[city];
        if (!englishCityName) {
            throw new Error('지원하지 않는 도시입니다.');
        }
        
        const weatherResponse = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
            params: {
                q: englishCityName,
                appid: WEATHER_API_KEY,
                units: 'metric',
                lang: 'kr'
            }
        });

        const weather = weatherResponse.data;
        const areaCode = areaCodeMap[city];

        let weatherCondition = weather.weather[0].main;
        if (weather.main.temp >= 25) weatherCondition = 'Hot';
        if (weather.main.temp < 10) weatherCondition = 'Cold';

        const contentTypeId = weatherToContentType[weatherCondition].contentTypes[0];
        const cat3 = weatherToContentType[weatherCondition].cat3[0];

        // 날씨 기반 추천은 3개만 보여주기
        const tourSpots = await getTourSpots({
            contentTypeId,
            cat3,
            areaCode,
            numOfRows: 3
        });

        res.json({
            weather: {
                temp: weather.main.temp,
                condition: weather.weather[0].main,
                description: weather.weather[0].description
            },
            recommendations: tourSpots.map(spot => ({
                id: spot.contentid,
                title: spot.title,
                address: spot.addr1,
                image: spot.firstimage || '/default-image.jpg',
                category: categoryTypes[contentTypeId],
                reason: `현재 날씨(${weather.weather[0].description})에 추천하는 장소입니다.`
            }))
        });
        
    } catch (error) {
        console.error('Weather API Error:', error.response?.data || error);
        res.status(500).json({ 
            message: '추천 정보를 가져오는데 실패했습니다.',
            error: error.message 
        });
    }
});

// 카테고리별 장소 목록 (더 자세한 정보)
router.get('/:city/category/:categoryId', async (req, res) => {
    try {
        const { city, categoryId } = req.params;
        const areaCode = areaCodeMap[city];

        const categoryToSubCategory = {
            '12': 'A02', // 관광지 -> 자연
            '14': 'B02', // 문화시설 -> 문화
            '15': 'B01', // 축제/공연/행사
            '28': 'A03', // 레포츠
            '38': 'A04', // 쇼핑
            '39': 'A05'  // 음식점
        };

        const tourSpots = await getTourSpots({
            contentTypeId: categoryId,
            cat3: categoryToSubCategory[categoryId],
            areaCode,
            numOfRows: 10
        });

        res.json({
            category: categoryTypes[categoryId],
            places: tourSpots.map(spot => ({
                id: spot.contentid,
                title: spot.title,
                address: spot.addr1,
                image: spot.firstimage || '/default-image.jpg',
                tel: spot.tel,
                mapx: spot.mapx,
                mapy: spot.mapy,
                overview: spot.overview
            }))
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            message: '장소 정보를 가져오는데 실패했습니다.',
            error: error.message 
        });
    }
});

module.exports = router;