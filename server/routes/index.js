const express = require("express");
const router = express.Router();
const validation = require("./validation.js");

const userController = require('../controllers').users;
const listController = require('../controllers').lists;
const itemController = require('../controllers').items;

router.get('/api', (req, res) => res.status(200).send({
message: 'Welcome to the Listly API!',
}));

router.post('/api/users/sign_up', validation.validateUsers, userController.signUp);
router.post('/api/users/sign_in', userController.signIn);
router.get('/api/users/sign_out', userController.signOut);

router.post('/api/lists/create', validation.validateLists, listController.create);
router.get('/api/lists/show', listController.show);

router.post('/api/lists/:id/create', validation.validateItems, itemController.create);
router.get('/api/lists/:id/show', itemController.show);
router.post('/api/lists/:id/update', validation.validateLists,listController.update);
router.post('/api/lists/:id/items/update', validation.validateLists, itemController.update)
router.post('/api/lists/:id/destroy', listController.destroy);
router.post('/api/lists/:id/items/destroy', itemController.destroy)

module.exports = router;
