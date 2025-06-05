const VendingMachineService = require('../../services/VendingMachineService');

describe('Scenario 1: Insert 5 MAD, buy soda (3.5 MAD), get soda and 1.5 MAD change', () => {
  let service;
  beforeEach(() => {
    service = new VendingMachineService.constructor();
    service.vendingMachine.balance = 0;
    service.vendingMachine.selectedProducts = [];
    console.log('--- Starting Scenario 1 Test ---');
  });

  it('should dispense soda and return 1.5 MAD change', () => {
    console.log('Step 1: Insert 5 MAD');
    let result = service.insertCoin(5);
    expect(result.success).toBe(true);
    expect(service.getBalance()).toBe(5);
    console.log('Inserted 5 MAD, current balance:', service.getBalance());

    console.log('Step 2: Select Soda (id: 1, price: 3.5)');
    result = service.selectProduct('1');
    expect(result.success).toBe(true);
    expect(service.getBalance()).toBeCloseTo(1.5);
    console.log('Selected Soda, remaining balance:', service.getBalance());

    console.log('Step 3: Complete Transaction');
    result = service.completeTransaction();
    expect(result.success).toBe(true);
    expect(result.dispensedProducts.length).toBe(1);
    expect(result.dispensedProducts[0].name).toBe('Soda');
    expect(result.changeTotal).toBeCloseTo(1.5);
    expect(result.change).toEqual([1, 0.5]);
    expect(service.getBalance()).toBe(0);
    console.log('Dispensed:', result.dispensedProducts.map(p => p.name).join(', '));
    console.log('Change returned:', result.change);
    console.log('--- Scenario 1 Test Complete ---');
  });
});

