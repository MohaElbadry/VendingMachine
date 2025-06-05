const vendingMachineService = require('../services/VendingMachineService');

class VendingMachineController {
  getProducts(req, res) {
    try {
      const products = vendingMachineService.getProducts();
      res.status(200).json({
        success: true,
        data: products,
        currentBalance: vendingMachineService.getBalance()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve products',
        error: error.message
      });
    }
  }

  insertCoin(req, res) {
    try {
      const { value } = req.body;
      if (value === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Coin value is required'
        });
      }
      const result = vendingMachineService.insertCoin(value);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to insert coin',
        error: error.message
      });
    }
  }

  selectProduct(req, res) {
    try {
      const { productId } = req.params;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required'
        });
      }
      const result = vendingMachineService.selectProduct(productId);
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to select product',
        error: error.message
      });
    }
  }

  completeTransaction(req, res) {
    try {
      const result = vendingMachineService.completeTransaction();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to complete transaction',
        error: error.message
      });
    }
  }

  cancelTransaction(req, res) {
    try {
      const result = vendingMachineService.cancelTransaction();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to cancel transaction',
        error: error.message
      });
    }
  }

  getBalance(req, res) {
    try {
      const balance = vendingMachineService.getBalance();
      res.status(200).json({
        success: true,
        balance: balance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve balance',
        error: error.message
      });
    }
  }
}

module.exports = new VendingMachineController();
