const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('orders', OrdersSchema);