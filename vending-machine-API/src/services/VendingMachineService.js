const VendingMachine = require('../models/VendingMachine');

class VendingMachineService {
  constructor() {
    if (VendingMachineService.instance) {
      return VendingMachineService.instance;
    }
    
    this.vendingMachine = new VendingMachine();
    
    this.vendingMachine.initializeProducts([
      { id: '1', name: 'Soda', price: 3.5 },
      { id: '2', name: 'Water', price: 2 },
      { id: '3', name: 'TikTak', price: 2 },
      { id: '4', name: 'Chocolate Bar', price: 4.5 },
      { id: '5', name: 'Chips', price: 5 }
    ]);
    
    VendingMachineService.instance = this;
  }

  getProducts() {
    return this.vendingMachine.getProducts();
  }

  insertCoin(value) {
    const coinValue = parseFloat(parseFloat(value).toFixed(2));
    return this.vendingMachine.insertCoin(coinValue);
  }

  selectProduct(productId) {
    return this.vendingMachine.selectProduct(productId);
  }

  completeTransaction() {
    return this.vendingMachine.completeTransaction();
  }

  cancelTransaction() {
    return this.vendingMachine.cancelTransaction();
  }

  getBalance() {
    return this.vendingMachine.balance;
  }
}

module.exports = new VendingMachineService();
