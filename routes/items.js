const express = require('express')

const router = express.Router()

const {getOrderItems} = require('../controllers/itemsController')

const {getItems} = require('../controllers/itemsController')

const {addItem} = require('../controllers/itemsController')

const {getCountPerItem} = require('../controllers/itemsController')

const {plusItem} = require('../controllers/itemsController')

const {minusItem} = require('../controllers/itemsController')

const {cutOrderById} = require('../controllers/itemsController')

router.get('/api/getOrderItems', getOrderItems)

router.get('/api/items', getItems)

router.post('/api/add_item', addItem)

router.get('/api/getItemCount', getCountPerItem)

router.post('/api/plusItem', plusItem)

router.post('/api/minusItem', minusItem)

router.post('/api/cutOrderById', cutOrderById)

module.exports = router;