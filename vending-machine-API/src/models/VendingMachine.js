const Coin = require('./Coin');
const Product = require('./Product');

class VendingMachine {
  constructor() {
    this.balance = 0;
    this.selectedProducts = [];
    this.availableProducts = [];
  }

  initializeProducts(products) {
    this.availableProducts = products.map(
      p => new Product(p.id, p.name, p.price)
    );
  }

  insertCoin(value) {
    // Validate the coin
    if (!Coin.isValid(value)) {
      return {
        success: false,
        message: 'Invalid coin. Please insert a valid coin.',
        rejectedCoin: value
      };
    }

    // Add to balance
    this.balance = parseFloat((this.balance + value).toFixed(2));
    
    return {
      success: true,
      message: `Inserted ${value} MAD. Current balance: ${this.balance} MAD`,
      currentBalance: this.balance
    };
  }

  getProducts() {
    return this.availableProducts.map(product => product.toJSON(this.balance));
  }

  selectProduct(productId) {
    const product = this.availableProducts.find(p => p.id === productId);
    
    // Check if product exists
    if (!product) {
      return {
        success: false,
        message: 'Product not found'
      };
    }
    
    // Check if balance is sufficient
    if (!product.isPurchasable(this.balance)) {
      return {
        success: false,
        message: `Insufficient funds. Product price: ${product.price} MAD, Current balance: ${this.balance} MAD`,
        missingAmount: parseFloat((product.price - this.balance).toFixed(2))
      };
    }
    
    // Add product to selected products
    this.selectedProducts.push(product);
    
    // Deduct price from balance
    this.balance = parseFloat((this.balance - product.price).toFixed(2));
    
    return {
      success: true,
      message: `Selected ${product.name}. Remaining balance: ${this.balance} MAD`,
      product: product,
      currentBalance: this.balance
    };
  }

  completeTransaction() {
    const dispensedProducts = [...this.selectedProducts];
    const change = Coin.calculateChange(this.balance);
    const changeTotal = change.reduce((sum, coin) => sum + coin, 0);
    
    // Reset the machine state
    this.selectedProducts = [];
    this.balance = 0;
    
    return {
      success: true,
      message: 'Transaction completed successfully',
      dispensedProducts: dispensedProducts,
      change: change,
      changeTotal: changeTotal
    };
  }

  cancelTransaction() {
    const refundedAmount = this.balance;
    const refundedCoins = Coin.calculateChange(refundedAmount);
    
    // Reset the machine state
    this.selectedProducts = [];
    this.balance = 0;
    
    return {
      success: true,
      message: 'Transaction cancelled',
      refundedAmount: refundedAmount,
      refundedCoins: refundedCoins
    };
  }
}

module.exports = VendingMachine;
