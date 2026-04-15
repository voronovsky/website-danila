const db = require('../db/connection')

exports.getItems = async (req, res) => {
    try{
        const [rows] = await db.query(
            'SELECT p.id AS "id", p.name AS "name", p.article AS "article", p.collection AS "collection", p.price AS "price", p.sale_price AS "action", CASE WHEN pt.tag_id = "1" THEN "new" WHEN pt.tag_id = "2" THEN "discount" WHEN pt.tag_id = "3" THEN "hit" END AS "tag", CASE WHEN p.quantity >= 1 THEN "В наличии" ELSE NULL END AS "quantity" FROM products AS p INNER JOIN product_tags AS pt ON pt.product_id = p.id INNER JOIN tags AS t ON t.id = pt.tag_id'
        )
        res.json(rows)
    }catch{
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.addItem = async (req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ addItem/////////////')
        const {user_id, item_id, price} = req.query;
        console.log("Получен набор данных: ", {user_id, item_id, price})

        //Создаем новый заказ            
        const [insertOrderRows] = await db.query(
            'INSERT INTO orders (user_id, status) VALUES (?, "Собирается")',
            user_id
        )
        //Вытаскиваем номер заказа(он авто-инкримент - создается автоматически)
        const orderId = insertOrderRows.insertId
        console.log("Создали и получили номер нового заказа: ", orderId)

        // 2. Добавить товар ()
        await db.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, 1, ?)',
            [orderId, item_id, price]
        )
        console.log("Добавили товар в заказ: ", orderId)

        // 3. Получить новое количество
        const [rows] = await db.query(
            'SELECT quantity FROM order_items WHERE order_id = ? AND product_id = ?',
            [orderId, item_id]
        );
        const newQuantity = rows[0]?.quantity || 1;
        console.log("Получено кол-во товаров в корзине: ", newQuantity)
        // 4. Вернуть клиенту объект с новым количеством
        res.json(newQuantity);        
        console.log('/////////////addItem ЗАКОНЧИЛ РАБОТУ/////////////')            
         
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.plusItem = async (req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ plusItem/////////////')
        const {user_id, item_id, price} = req.query;
        console.log("Получен набор данных: ", {user_id, item_id, price})
        const [searchRowsPlus] = await db.query(
            'SELECT T.id FROM orders as T WHERE T.user_id = ? AND T.status = "Собирается"',
            [user_id]
        )
        if (searchRowsPlus.length > 0) {            
            const orderId = searchRowsPlus[0].id
            console.log("Обнаружен номер заказа для обновления: ", orderId)
            const [updateRowsPlus] = await db.query(
                'UPDATE order_items SET quantity = quantity + 1, price = price + ? WHERE order_id = ? AND product_id = ?',
                [price, orderId, item_id]
            )
            if (updateRowsPlus.affectedRows > 0) {
                console.log("Удалось обновить кол-во товаров по заказу", orderId)
                const [rows] = await db.query(
                    'SELECT quantity FROM order_items WHERE order_id = ? AND product_id = ?',
                    [orderId, item_id]
                );
                const newQuantity = rows[0]?.quantity || 1;
                console.log("Получено кол-во товаров: ", newQuantity)                
                res.json(newQuantity);
            }else{
                console.log("Не удалось обновить кол-во товаров по заказу", orderId)
            }
        }
        console.log('/////////////plusItem ЗАКОНЧИЛ РАБОТАТЬ/////////////')
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.minusItem = async (req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ minusItem/////////////')
        const {user_id, item_id, price} = req.query;
        console.log("Получен набор данных: ", {user_id, item_id, price})
        const [searchRowsMinus] = await db.query(
            'SELECT T.id FROM orders as T WHERE T.user_id = ? AND T.status = "Собирается"',
            [user_id]
        )
        if ([searchRowsMinus]) {            
            const orderId = searchRowsMinus[0].id
            console.log("Обнаружен номер заказа для обновления: ", orderId)
            const [itemQuantity] = await db.query(
                'SELECT quantity FROM order_items as T WHERE T.product_id = ? AND T.order_id = ?',
                [item_id, orderId]
            )
            //Проверяется кол-во штук по товарной позиции в заказе
            //Если кол-во больше 1, то просто делаем UPDATE
            if(itemQuantity[0].quantity > 1){
                const [updateRowsMinus] = await db.query(
                'UPDATE order_items SET quantity = quantity - 1, price = price - ? WHERE order_id = ? AND product_id = ?',
                [price, orderId, item_id]
                )
                if (updateRowsMinus.affectedRows > 0) {
                    console.log("Удалось обновить кол-во товаров по заказу", orderId)
                    const [rows] = await db.query(
                        'SELECT quantity FROM order_items WHERE order_id = ? AND product_id = ?',
                        [orderId, item_id]
                    );
                    const newQuantity = rows[0]?.quantity || 1;
                    console.log("Получено кол-во товаров: ", newQuantity)                
                    res.json(newQuantity);
                }else{
                    console.log("Не удалось обновить кол-во товаров по заказу", orderId)
                }
            }else{
                const [deleteItemRows] = await db.query(
                    'DELETE FROM order_items WHERE product_id = ?',
                    [item_id]
                )
                if (deleteItemRows.affectedRows > 0) {
                    console.log("Удалось удалить товарную позицию по заказу", orderId)
                }else{
                    console.log("Не удалось удалить товарную позицию по заказу", orderId)
                }
            }
        }
        console.log('/////////////minusItem ЗАКОНЧИЛ РАБОТАТЬ/////////////')

    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.getCountPerItem = async (req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ getCountPerItem/////////////')
        const {user_id, item_id} = req.query;
        const [searchCount] = await db.query(
            'SELECT id FROM orders WHERE user_id = ? AND status = "Собирается"',
            [user_id]
        )
        if (searchCount.length > 0) {
            const orderId = searchCount[0].id
            console.log("Ищем товары по этому заказу: ", orderId)
            const [rows] = await db.query(
                'SELECT quantity FROM order_items WHERE order_id = ? AND product_id = ?',
                [orderId, item_id]
            );
            const newQuantity = rows[0]?.quantity || 1;
            console.log("Получено кол-во товаров: ", newQuantity)                
            res.json(newQuantity);
            console.log("/////////////getCountPerItem ЗАКОНЧИЛ РАБОТУ/////////////")            
        }else{
            console.log('Заказ не найден (корзина пуста)');
            res.json(0); // нет заказа, количество 0
            console.log("/////////////getCountPerItem ЗАКОНЧИЛ РАБОТУ/////////////") 
        }
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.getCartByUser = async(req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ getCartByUser/////////////')
        const {user_id} = req.query;
        const [searchCart] = await db.query(
            'SELECT id FROM orders WHERE user_id = ? AND status = "Собирается"',
            [user_id]
        )
        if (searchCart.length > 0) {
            const orderId = searchCart[0].id
            console.log("Ищем корзину по этому заказу: ", orderId)
            const [cartItems] = await db.query(
                'SELECT id, order_id, product_id, quantity, price FROM order_items WHERE order_id = ?',
                [orderId]
            )
            if (cartItems.length > 0) {
                const result = cartItems;
                console.log("Обнаружили товары корзины по заказу: ", orderId);
                console.log(result);
                res.json(result);
            }else{
                console.log("Не удалось обнаружить корзину по заказу: ", orderId);
                res.json(0)
            }
            console.log("/////////////getCartByUser ЗАКОНЧИЛ РАБОТУ/////////////")   
        }else{
            console.log("Не удалось обнаружить корзину");
            res.json(0)
            console.log("/////////////getCartByUser ЗАКОНЧИЛ РАБОТУ/////////////") 
        }
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.cutOrderById = async(req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ cutOrderById/////////////')
        const {user_id} = req.query;
        console.log('Ищем заказ по пользователю: ', user_id)
        const [searchCart] = await db.query(
            'SELECT id FROM orders WHERE user_id = ? AND status = "Собирается"',
            [user_id]
        )
        if (searchCart.length > 0) {
            const orderId = searchCart[0].id
            console.log('По пользователю обнаружен заказ для удаления: ', orderId)
            const [deleteOrderRows] = await db.query(
                'DELETE FROM orders WHERE id = ?',
                [orderId]
            )
            if (deleteOrderRows.affectedRows > 0) {
                console.log("Удалось удалить заказ", orderId)
                res.json('delete success')
                console.log("/////////////cutOrderById ЗАКОНЧИЛ РАБОТУ/////////////") 
            }else{
                console.log("Не удалось удалить заказ", orderId)
                res.json('delete NOT success')
                console.log("/////////////cutOrderById ЗАКОНЧИЛ РАБОТУ/////////////") 
            }
        }        
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}

exports.getOrderItems = async (req, res) => {
    try{
        console.log('/////////////РАБОТАЕТ getOrderItems/////////////')
        const {user_id} = req.query;
        console.log('Ищем заказ по пользователю: ', user_id)
        const [searchOrder] = await db.query(
            'SELECT id FROM orders WHERE user_id = ? AND status = "Собирается"',
            [user_id]
        )
        if (searchCart.length > 0) {
            const orderId = searchCart[0].id
            console.log('По пользователю обнаружен заказ: ', orderId)
            const [orderItemRows] = await db.query(
                'SELECT product_id, quantity, price WHERE order_id = ?',
                [orderId]
            )
            console.log('Обнаружен массив товаров по заказу: ', orderItemRows)      
            res.json(orderItemRows)  
            console.log("/////////////getOrderItems ЗАКОНЧИЛ РАБОТУ/////////////")    
        }
    }catch{
        console.error(e);
        res.status(500).json({
            message: 'Внутренняя ошибка сервера, надо разбираться'
        })
    }
}