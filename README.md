# Toy Project: Where To Go
**현재 날씨를 기반으로 관광지를 추천해주는 웹 서비스 ** <br>
비가 오면 실내 관광지를, 맑은 날에는 야외 관광지를 추천하는 등 날씨에 최적화된 국내 관광 장소를 추천

<br><br><br>
## 주요 기능  
- **날씨 기반 추천**
  - 선택한 도시의 실시간 날씨 정보를 제공  
  - 현재 날씨에 적합한 관광지를 자동 추천  
  - 추천 이유와 함께 상세 정보를 확인

- **카테고리별 검색**
  - 원하는 카테고리의 관광지 검색 가능  
  - 카테고리 목록:
    - 관광지/자연, 문화시설, 레포츠, 쇼핑, 음식점  

- **지역 선택**
  - **지원 지역:**  
    - 서울특별시, 부산광역시, 인천광역시, 대구광역시, 광주광역시, 대전광역시, 울산광역시, 세종특별자치시, 제주특별자치도  
  - **추가 예정 지역:** 다양한 도시로 점차 확장할 예정입니다    
<br><br><br>
## 기술 스택

### Frontend  
- **React 18**: 동적 사용자 인터페이스  
- **JavaScript (ES6+)**: 최신 문법 사용  
- **CSS3**: 스타일링  
- **React Router DOM**: 라우팅  
- **Fetch API**: 데이터 통신  

### Backend  
- **Node.js** 기반 API 라우팅
  
  <br><br><br>
## API e.p.

BASE back-end URL: `http://localhost:8080/api`     
BASE front-end URL: `http://localhost:3000`

#### 1. 날씨기반 장소 추천 
- **Endpoint:** `GET /weather/{city}`  
- 선택한 도시의 날씨를 기반으로 추천 장소 반환  
- **Response:**
```json
{
    "weather": {
        "temp": "22.5",
        "description": "맑음"
    },
    "recommendations": [
        {
            "id": "1",
            "title": "장소명",
            "category": "카테고리",
            "image": "이미지URL",
            "reason": "추천이유"
        }
    ]
}
```

#### 2. 카테고리별 장소 조회
- **Endpoint:** `GET /weather/{city}/category/{categoryId}`  
- 선택한 도시와 카테고리에 맞는 장소 목록 반환  
- **Response:**
```json
{
    "category": "카테고리명",
    "places": [
        {
            "id": "1",
            "title": "장소명",
            "category": "카테고리",
            "image": "이미지URL"
        }
    ]
}
```

<br><br><br>
## 프로젝트 구조

```
WhereToGo/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api/
│       │   └── api.js              # API 통신 함수 정의
│       ├── components/
│       │   ├── CategoryList.jsx    # 카테고리별 장소 목록
│       │   ├── CategorySelector.jsx # 카테고리 선택 UI
│       │   ├── CitySelector.jsx    # 도시 선택 UI
│       │   ├── Header.jsx          # 페이지 헤더
│       │   ├── PlaceList.jsx       # 장소 목록 렌더링
│       │   ├── WeatherInfo.jsx     # 날씨 정보 표시
│       │   └── WeatherRecommendations.jsx  # 날씨 기반 추천 컴포넌트
│       ├── pages/
│       │   ├── CategoryPage.jsx    # 카테고리 선택 결과 페이지
│       │   ├── Home.js             # 홈페이지 컴포넌트
│       │   └── MainPage.jsx        # 메인 페이지 컴포넌트
│       ├── styles/
│       │   ├── CategorySelector.css
│       │   ├── MainPage.css
│       │   └── WeatherRecommendations.css
│       └── App.js                  # 라우팅 설정
└── backend/
    ├── routes/
    │   └── weatherRouter.js        # 날씨 및 장소 API 라우터
    ├── services/
    │   └── tourApi.js              # 외부 관광 API 연동
    ├── utils/
    │   ├── areaCode.js             # 지역 코드 관리
    │   └── tourCategory.js         # 관광 카테고리 관리
    └── index.js                    # 서버 설정 및 실행
```


<br><br><br>
## 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/yejinj/WhereToGo.git
```

### 2. 프론트엔드 실행  
```bash
cd frontend
npm install
npm start
```

### 3. 백엔드 실행  
```bash
cd backend
npm install
node index.js
```

<br><br><br>
## 주요 화면  

### 메인 화면
- **기능:**  
  - 날씨 기반 관광지 추천 타이틀 표시  
  - 도시 선택 드롭다운  
  - 카테고리 선택 버튼  
  - 실시간 날씨 정보 표시

<br><br><br>
