const Coin = require('../../models/Coin');

describe('Coin Model', () => {
  describe('isValid', () => {
    it('should return true for valid coin denominations', () => {
      expect(Coin.isValid(0.5)).toBe(true);
      expect(Coin.isValid(1)).toBe(true);
      expect(Coin.isValid(2)).toBe(true);
      expect(Coin.isValid(5)).toBe(true);
      expect(Coin.isValid(10)).toBe(true);
    });

    it('should return false for invalid coin denominations', () => {
      expect(Coin.isValid(0)).toBe(false);
      expect(Coin.isValid(-1)).toBe(false);
      expect(Coin.isValid(3)).toBe(false);
      expect(Coin.isValid(7)).toBe(false);
      expect(Coin.isValid('1')).toBe(false); // String value
    });
  });

  describe('calculateChange', () => {
    it('should return empty array for zero or negative amount', () => {
      expect(Coin.calculateChange(0)).toEqual([]);
      expect(Coin.calculateChange(-1)).toEqual([]);
    });

    it('should calculate optimal change for exact denominations', () => {
      expect(Coin.calculateChange(10)).toEqual([10]);
      expect(Coin.calculateChange(5)).toEqual([5]);
      expect(Coin.calculateChange(2)).toEqual([2]);
      expect(Coin.calculateChange(1)).toEqual([1]);
      expect(Coin.calculateChange(0.5)).toEqual([0.5]);
    });

    it('should calculate optimal change for mixed amounts', () => {
      // 1.5 = 1 + 0.5
      expect(Coin.calculateChange(1.5)).toEqual([1, 0.5]);
      
      // 7 = 5 + 2
      expect(Coin.calculateChange(7)).toEqual([5, 2]);
      
      // 7.5 = 5 + 2 + 0.5
      expect(Coin.calculateChange(7.5)).toEqual([5, 2, 0.5]);
      
      // 18.5 = 10 + 5 + 2 + 1 + 0.5
      expect(Coin.calculateChange(18.5)).toEqual([10, 5, 2, 1, 0.5]);
    });
  });
});
