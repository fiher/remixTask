const { body, param, validationResult } = require('express-validator');
const axios = require('axios');

const userValidation = userId => {
    return axios.get(`${process.env.USER_MANAGEMENT_URL}${userId}`)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject('User validation failed');
            }
        })
        .catch(error => {
            return Promise.reject('User validation failed with error: ' + error.message);
        });
};

const validateCreateOrder = [
    body('userId').isInt().withMessage('User ID must be a valid integer').custom(userValidation),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a valid number greater than or equal to 0'),
    body('status').isIn(['PENDING', 'CANCELLED', 'PAID', 'RETURNED', 'DELIVERED']).withMessage('Invalid status value'),
    handleValidationErrors
];

const validateGetOrdersByUserId = [
    param('userId').isInt().withMessage('User ID must be a valid integer'),
    handleValidationErrors
];

const validateChangeOrderStatus = [
    body('orderId').isInt().withMessage('Order ID must be a valid integer'),
    body('status').isIn(['PENDING', 'CANCELLED', 'PAID', 'RETURNED', 'DELIVERED']).withMessage('Invalid status value'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateCreateOrder,
    validateGetOrdersByUserId,
    validateChangeOrderStatus
};
