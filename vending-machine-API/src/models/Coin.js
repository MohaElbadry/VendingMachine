class Coin {
  static validCoins = [0.5, 1, 2, 5, 10];

  static isValid(value) {
    return this.validCoins.includes(value);
  }

  static calculateChange(amount) {
    let change = [];
    let remaining = parseFloat(amount.toFixed(2));
    const coins = [...this.validCoins].sort((a, b) => b - a);
    for (let coin of coins) {
      while (remaining >= coin - 0.001) {
        change.push(coin);
        remaining = parseFloat((remaining - coin).toFixed(2));
      }
    }
    return change;
  }
}

module.exports = Coin;
