const express = require('express')

const router = express.Router()

const {getItems} = require('../controllers/itemsController')

const {addItem} = require('../controllers/itemsController')

const {getCountPerItem} = require('../controllers/itemsController')

const {plusItem} = require('../controllers/itemsController')

const {minusItem} = require('../controllers/itemsController')

router.get('/api/items', getItems)

router.post('/api/add_item', addItem)

router.get('/api/getItemCount', getCountPerItem)

router.post('/api/plusItem', plusItem)

router.post('/api/minusItem', minusItem)

module.exports = router;