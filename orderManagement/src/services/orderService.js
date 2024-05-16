const OrderRepository = require('../repositories/orderRepository');

class OrderService {
    constructor(repository = new OrderRepository()) {
        this.repository = repository;
    }
    createOrder(userId, price, status) {
        return this.repository.createOrder(userId, price, status);
    }

    getOrdersByUserId(userId) {
        return this.repository.getOrdersByUserId(userId);
    }

    changeOrderStatus(orderId, status) {
        return this.repository.changeOrderStatus(orderId, status);
    }
}

module.exports = new OrderService();