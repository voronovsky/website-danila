console.log('Hello world');

const express = require('express') //Веб фреймворк для Node.js для разработки серверных приложении

const path = require('path');

const app = express() //Создание веб-приложения на базе фреймворка express

const itemRouter = require('./routes/items')

const userRouter = require('./routes/users')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', itemRouter);

app.use('/', userRouter);

const PORT = process.env.PORT || 3000; //Установка использованного ПОРТА для работы нашего локального приложения

app.listen(PORT, () => { //Слушатель для callback функции (получения обратной связи)
    console.log('Сервер запустился!!!');
})