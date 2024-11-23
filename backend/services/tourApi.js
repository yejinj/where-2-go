const axios = require('axios');

const TOUR_API_KEY = process.env.TOUR_API_KEY;
const TOUR_API_BASE_URL = 'http://apis.data.go.kr/B551011/KorService1';

const getTourSpots = async ({ contentTypeId, cat3, areaCode, numOfRows = 5 }) => {
    try {
        const response = await axios.get(`${TOUR_API_BASE_URL}/areaBasedList1`, {
            params: {
                serviceKey: decodeURIComponent(TOUR_API_KEY), // API 키 디코딩
                numOfRows,
                pageNo: 1,
                MobileOS: 'ETC',
                MobileApp: 'WhereToGo',
                _type: 'json',
                listYN: 'Y',
                arrange: 'P',
                contentTypeId,
                areaCode
            },
            headers: {
                accept: 'application/json'
            }
        });

        if (!response.data.response?.body?.items?.item) {
            console.log('No tour spots found');
            return [];
        }

        const items = response.data.response.body.items.item;
        return Array.isArray(items) ? items : [items];

    } catch (error) {
        console.error('Tour API Error Details:', {
            message: error.message,
            response: error.response?.data,
            params: { contentTypeId, cat3, areaCode, numOfRows }
        });
        throw error;
    }
};

module.exports = {
    getTourSpots
};