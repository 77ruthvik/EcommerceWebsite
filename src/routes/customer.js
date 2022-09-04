const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/add', customerController.save);
router.post('/deletefromcart', customerController.del);
router.get('/login', customerController.login);
router.post('/login-user', customerController.login_user);
router.get('/signup', customerController.signup);
router.post('/signup-data', customerController.addUsers);
router.get('/signout', customerController.signout);
router.get('/cart', customerController.viewcart);
router.post('/search', customerController.search);
router.get('/item-data:id', customerController.items_expanded);
router.post('/checkout', customerController.checkout);
router.post('/completecheckout', customerController.buy);
router.post('/filter', customerController.filter);

module.exports = router;