const db = require('../db/connection')

const bcrypt = require('bcrypt')

exports.logInUser = async (req, res) => {
    try{        
        const {login, password} = req.query;
        console.log('Получен GET запрос:', { login, password });
        /*
        if (!login && !password) {
            return res.status(400).json({
                message: 'Необходимо указать Логин и Пароль'
            });
        }
        */
        const [rows] = await db.query(
            'SELECT id, full_name, login, password FROM users WHERE login = ?',
            [login]
        );
        /*
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Пользователь не обнаружен'
            });
        }
        */
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        /*
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Неверный пароль'
            });
        }
        */
        console.log([user.id, user.full_name])
        res.json[user.id, user.full_name];
    }catch (error){
        console.error('Ошибка в /api/logInUser:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
    }
}