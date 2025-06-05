class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  isPurchasable(balance) {
    return balance >= this.price;
  }

  toJSON(balance) {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      purchasable: this.isPurchasable(balance)
    };
  }
}

module.exports = Product;
