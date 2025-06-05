const Product = require('../../models/Product');

describe('Product Model', () => {
  let product;

  beforeEach(() => {
    product = new Product('1', 'Test Product', 5);
  });

  describe('constructor', () => {
    it('should correctly initialize product properties', () => {
      expect(product.id).toBe('1');
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe(5);
    });
  });

  describe('isPurchasable', () => {
    it('should return true when balance is sufficient', () => {
      expect(product.isPurchasable(5)).toBe(true);
      expect(product.isPurchasable(10)).toBe(true);
    });

    it('should return false when balance is insufficient', () => {
      expect(product.isPurchasable(4.99)).toBe(false);
      expect(product.isPurchasable(0)).toBe(false);
      expect(product.isPurchasable(-1)).toBe(false);
    });
  });

  describe('toJSON', () => {
    it('should return correct representation with purchasable true', () => {
      const json = product.toJSON(10);
      expect(json).toEqual({
        id: '1',
        name: 'Test Product',
        price: 5,
        purchasable: true
      });
    });

    it('should return correct representation with purchasable false', () => {
      const json = product.toJSON(3);
      expect(json).toEqual({
        id: '1',
        name: 'Test Product',
        price: 5,
        purchasable: false
      });
    });
  });
});
