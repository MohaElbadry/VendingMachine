// Vending machine API routes
const express = require('express');
const router = express.Router();
const vendingMachineController = require('../controllers/VendingMachineController');

// Get all products
router.get('/', vendingMachineController.getProducts);
// Get all products (alternative route)
router.get('/products', vendingMachineController.getProducts);
// Insert a coin
router.post('/coins', vendingMachineController.insertCoin);
// Get current balance
router.get('/balance', vendingMachineController.getBalance);
// Select a product by ID
router.post('/products/:productId/select', vendingMachineController.selectProduct);
// Complete the transaction (dispense products and change)
router.post('/transaction/complete', vendingMachineController.completeTransaction);
// Cancel the transaction (refund)
router.post('/transaction/cancel', vendingMachineController.cancelTransaction);

module.exports = router;
