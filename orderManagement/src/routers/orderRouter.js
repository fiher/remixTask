const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateCreateOrder, validateGetOrdersByUserId, validateChangeOrderStatus } = require('../middlewares/orderValidator');

router.post('/create', validateCreateOrder, orderController.createOrder);
router.get('/getOrderByUserId', validateGetOrdersByUserId, orderController.getOrdersByUserId);
router.post('/changeOrderStatus', validateChangeOrderStatus, orderController.changeOrderStatus);

module.exports = router;