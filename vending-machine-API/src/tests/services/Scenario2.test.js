const VendingMachineService = require('../../services/VendingMachineService');

describe('Scenario 2: Insert 5 MAD, then 2 MAD, buy chocolate bar (4.5 MAD) and TikTak (2 MAD), get both and 0.5 MAD change', () => {
  let service;
  beforeEach(() => {
    service = new VendingMachineService.constructor();
    service.vendingMachine.balance = 0;
    service.vendingMachine.selectedProducts = [];
    console.log('--- Starting Scenario 2 Test ---');
  });

  it('should dispense chocolate bar and TikTak, and return 0.5 MAD change', () => {
    console.log('Step 1: Insert 5 MAD');
    let result = service.insertCoin(5);
    expect(result.success).toBe(true);
    console.log('Inserted 5 MAD, current balance:', service.getBalance());

    console.log('Step 2: Insert 2 MAD');
    result = service.insertCoin(2);
    expect(result.success).toBe(true);
    expect(service.getBalance()).toBe(7);
    console.log('Inserted 2 MAD, current balance:', service.getBalance());

    console.log('Step 3: Select Chocolate Bar (id: 4, price: 4.5)');
    result = service.selectProduct('4');
    expect(result.success).toBe(true);
    expect(service.getBalance()).toBeCloseTo(2.5);
    console.log('Selected Chocolate Bar, remaining balance:', service.getBalance());

    console.log('Step 4: Select TikTak (id: 3, price: 2)');
    result = service.selectProduct('3');
    expect(result.success).toBe(true);
    expect(service.getBalance()).toBeCloseTo(0.5);
    console.log('Selected TikTak, remaining balance:', service.getBalance());

    console.log('Step 5: Complete Transaction');
    result = service.completeTransaction();
    expect(result.success).toBe(true);
    expect(result.dispensedProducts.length).toBe(2);
    const names = result.dispensedProducts.map(p => p.name);
    expect(names).toContain('Chocolate Bar');
    expect(names).toContain('TikTak');
    expect(result.changeTotal).toBeCloseTo(0.5);
    expect(result.change).toEqual([0.5]);
    expect(service.getBalance()).toBe(0);
    console.log('Dispensed:', result.dispensedProducts.map(p => p.name).join(', '));
    console.log('Change returned:', result.change);
    console.log('--- Scenario 2 Test Complete ---');
  });
});

