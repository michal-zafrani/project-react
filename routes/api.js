const router = require('express').Router();

const { logUp, logIn, signIn ,logInWithJwt , updateUser , deleteUser } = require('../controller/userControler');
const { createProduct, getAllProducts, deleteProduct ,updateProduct } = require('../controller/productController');
const { createBuy , getBuysList } = require('../controller/buyController')

//user
router.post('/user/logUp',logUp); //create user - get params from body 
router.get('/user/logIn', logIn); //get user by id - return token user
router.patch('/user/updateUser' , updateUser)
router.delete('/user/deleteUser' , deleteUser); //delete user
router.post('/user/signIn', signIn);
router.get('/user/logInWithJwt', logInWithJwt);

//product
router.post('/admin/product/createProduct', createProduct);
router.get('/product/getAllProducts' , getAllProducts );
router.delete('/admin/product/deleteProduct', deleteProduct); 
router.patch('/admin/product/updateProduct', updateProduct); 

//buyController
router.post('/buy/createBuy' , createBuy);
router.get('/buy/getBuysList' , getBuysList)

module.exports = router;