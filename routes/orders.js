const express = require('express');
const Order = require('../models/Orders');

const router = express.Router();
const { check, validationResult } = require('express-validator');



// @route     GET api/orders/
// @desc      get all user orders
// @access    Private
router.get('/',  async (req, res) => {
    try {
        

        const orders = await Order.find().sort({
            product_name: -1
        });

         //let result = orders.map(order => {
        /* orders.forEach(order => {
            
            //var formatted_date = date_convert( new Date(order.purchase_date) );
            //console.log("obj is: ", formatted_date  );
            //order.purchase_date = formatted_date;
            //console.log("pd is: ", order.purchase_date );
            
        });  */
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

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// @route     POST api/orders/random
// @desc      post an order
// @access    Private
router.get('/random',  async (req, res) => {

    try{
        let dates = ["21/07/2020","22/07/2020","23/07/2020","24/07/2020","25/07/2020"];
        let quantity_array = ["1","2","3","4","5"];
        for (let index = 100; index < 500; index++) {
            var product_name = "Product " + index + " ";
            var price = randomInteger(20, 500);
            var dates_index = randomInteger(0, 4);
            var purchase_date = dates[dates_index];
            var qty = quantity_array[dates_index];
            var customer = 'Raju';
            if (index %2 ==0) {
                customer = 'Amar';
            }

            const newOrder = new Order({
                product_name,
                price,
                purchase_date,
                customer,
                qty
            });

            const order = await newOrder.save();


            //const product_name = "Product "+index+" ";
            console.log("this is order " , order);
            //console.log("this is price "+price);
            
        }
        res.send("this is random");

        
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);



// @route     PUT api/orders/:id
// @desc      post an order to update it with id
// @access    Private
router.put('/:id',  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { product_name, price, purchase_date, customer, qty } = req.body;

    // Build orders object
    const orderFields = {};
    if (product_name) orderFields.product_name = product_name;
    if (price) orderFields.price = price;
    if (purchase_date) orderFields.purchase_date = purchase_date;
    if (customer) orderFields.customer = customer;
    if (qty) orderFields.qty = qty;

    try {
        let order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: orderFields },
            { new: true }
        );

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    DELETE api/orders/:id
// @desc     Delete an order
// @access   Private
router.delete('/:id',  async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ msg: 'order not found' });

        await Order.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Order removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



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