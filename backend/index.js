require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRouter = require('./routes/weatherRouter');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우터 설정
app.use('/api/weather', weatherRouter);

// 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 처리
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});