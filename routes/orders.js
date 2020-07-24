const express = require('express');
const Order = require('../models/Orders');

const router = express.Router();
const { check, validationResult } = require('express-validator');



// @route     GET api/orders/
// @desc      get all user orders
// @access    Private
router.get('/',  async (req, res) => {
    try {
        

        var orders = await Order.find().sort({
            purchase_date: -1
        });

         //let result = orders.map(order => {
        orders.forEach(order => {
            //let isoDateStr = order.purchase_date.toISOString();
            //isoDateStr = isoDateStr.substring(0, isoDateStr.indexOf('T'));
            var formatted_date = date_convert( new Date(order.purchase_date) );
            console.log("obj is: ", formatted_date  );
             //order.qty *= 2;
            // order.product_name = '  aaaaaaaa';
            order.hey = 'hhhh';
            order.purchase_date += 'asdf';
            console.log("pd is: ", order.purchase_date );
            //return order;
            //return isoDateStr;
        }); 
        res.json(orders);
        //res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route     POST api/orders/
// @desc      post an order
// @access    Private
router.post(
    '/',
    [
        
        [
            check('product_name', 'Name is required')
                .not()
                .isEmpty(),
            check('price', 'Price is required')
                .not()
                .isEmpty(),
            check('purchase_date', 'Purchase date is required')
                .not()
                .isEmpty(),
            check('customer', 'Customer is required')
                .not()
                .isEmpty(),
            check('qty', 'Quantity is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { product_name, price, purchase_date, customer, qty } = req.body;

        try {
            const newOrder = new Order({
                product_name,
                price,
                purchase_date,
                customer,
                qty: qty
            });

            const order = await newOrder.save();

            res.json(order);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);



function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function date_convert(dt){
    let dd = dt.getDate();
    let mm = dt.getMonth() + 1;
    let yyyy = dt.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
}



module.exports = router;