//variables declarations.
var express = require('express');
var router = express.Router();
var visitorController = require('../Guest/guestController');
var userController = require('../Receptionist/recept_controller');

//user routes
router.post('/login', userController.loginUser);
router.post('/register', userController.addUser);

//guest routes
router.post('/addvisitor', visitorController.addGuest);
router.post('/getall', visitorController.getAll);
router.get('/get/:id', visitorController.getGuestById);
router.post('/update/:id', visitorController.updateGuest);
router.post('/checkout', visitorController.userCheckOut);
router.delete('/delete/:id', visitorController.deleteGuestById);

module.exports = router;


