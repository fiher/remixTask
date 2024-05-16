class Order {
    constructor(orderId, userId, price, status) {
        this.orderId = orderId;
        this.userId = userId;
        this.price = price;
        this.status = status;
    }
}

module.exports = Order