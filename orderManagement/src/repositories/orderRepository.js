const defaultPool = require('../database/database');
const Order = require('../models/Order');

class OrderRepository {
    constructor(pool = defaultPool) {
        this.pool = pool;
    }

    async createOrder(userId, price, status) {
        const sql = 'INSERT INTO orders (userId, price, status) VALUES (?, ?, ?)';
        const [result] = await this.pool.query(sql, [userId, price, status]);
        return this.getOrderById(result.insertId);
    }

    async getOrderById(orderId) {
        const sql = 'SELECT * FROM orders WHERE orderId = ?';
        const [results] = await this.pool.query(sql, [orderId]);
        if (results.length === 0) throw new Error("No order found.");
        return new Order(results[0].orderId, results[0].userId, results[0].price, results[0].status);
    }

    async getOrdersByUserId(userId) {
        const sql = 'SELECT * FROM orders WHERE userId = ?';
        const [results] = await this.pool.query(sql, [userId]);
        return results.map(row => new Order(row.orderId, row.userId, row.price, row.status));
    }

    async changeOrderStatus(orderId, status) {
        const sql = 'UPDATE orders SET status = ? WHERE orderId = ?';
        const [result] = await this.pool.query(sql, [status, orderId]);
        if (result.affectedRows === 0) throw new Error("No order found.");
        return { orderId, status };
    }
}

module.exports = OrderRepository;