const weatherToContentType = {
  'Clear': {
      contentTypes: ['12'], // 관광지
      cat3: ['A02']  // 자연
  },
  'Clouds': {
      contentTypes: ['12', '14'], // 관광지, 문화시설
      cat3: ['A02', 'B02']  // 자연, 문화
  },
  'Rain': {
      contentTypes: ['14', '38'], // 문화시설, 쇼핑
      cat3: ['B02', 'A04']  // 문화, 쇼핑
  },
  'Snow': {
      contentTypes: ['14', '28'], // 문화시설, 레포츠
      cat3: ['B02', 'A03']  // 문화, 레포츠
  },
  'Hot': {
      contentTypes: ['14', '38'], // 문화시설, 쇼핑
      cat3: ['B02', 'A04']  // 문화, 쇼핑
  },
  'Cold': {
      contentTypes: ['14', '39'], // 문화시설, 음식점
      cat3: ['B02', 'A05']  // 문화, 음식
  }
};

// 카테고리 정보 (Tour API contentTypeId)
const categoryTypes = {
  '12': '관광지',
  '14': '문화시설',
  '15': '축제/공연/행사',
  '28': '레포츠',
  '32': '숙박',
  '38': '쇼핑',
  '39': '음식점'
};

// 서브 카테고리 정보 (Tour API cat3)
const subCategories = {
  'A01': '자연관광지',
  'A02': '관광자원',
  'B02': '문화시설',
  'A03': '레포츠',
  'A04': '쇼핑',
  'A05': '음식',
  'B01': '축제/공연/행사'
};

module.exports = {
  weatherToContentType,
  categoryTypes,
  subCategories
};