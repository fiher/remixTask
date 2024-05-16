const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const { userId, price, status } = req.body;
        const order = await orderService.createOrder(userId, price, status);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const orders = await orderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const result = await orderService.changeOrderStatus(orderId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};