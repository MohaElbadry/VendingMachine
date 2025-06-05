// First, we need to mock the VendingMachine class before requiring the service
const mockGetProducts = jest.fn();
const mockInsertCoin = jest.fn();
const mockSelectProduct = jest.fn();
const mockCompleteTransaction = jest.fn();
const mockCancelTransaction = jest.fn();
const mockInitializeProducts = jest.fn();

// Mock the VendingMachine class
jest.mock('../../models/VendingMachine', () => {
  return jest.fn().mockImplementation(() => ({
    getProducts: mockGetProducts,
    insertCoin: mockInsertCoin,
    selectProduct: mockSelectProduct,
    completeTransaction: mockCompleteTransaction,
    cancelTransaction: mockCancelTransaction,
    initializeProducts: mockInitializeProducts,
    balance: 0
  }));
});

// We need to mock the service module to control the singleton instance
let vendingMachineServiceInstance;
jest.mock('../../services/VendingMachineService', () => {
  const actualService = jest.requireActual('../../services/VendingMachineService');
  vendingMachineServiceInstance = actualService;
  return actualService;
});

// Now we can require the modules
const VendingMachine = require('../../models/VendingMachine');
const vendingMachineService = require('../../services/VendingMachineService');

describe('VendingMachineService', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Reset the balance for each test
    Object.defineProperty(vendingMachineServiceInstance.vendingMachine, 'balance', {
      value: 0,
      writable: true
    });
  });

  describe('getProducts', () => {
    it('should call vendingMachine.getProducts', () => {
      // Setup mock return value
      const mockProducts = [{ id: '1', name: 'Test', price: 1, purchasable: true }];
      mockGetProducts.mockReturnValue(mockProducts);
      
      // Call the service method
      const result = vendingMachineService.getProducts();
      
      // Verify the underlying method was called
      expect(mockGetProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('insertCoin', () => {
    it('should convert string values to numbers and call vendingMachine.insertCoin', () => {
      // Setup mock return value
      const mockResult = { success: true, currentBalance: 5 };
      mockInsertCoin.mockReturnValue(mockResult);
      
      // Call the service method with a string value
      const result = vendingMachineService.insertCoin('5');
      
      // Verify the underlying method was called with the converted number
      expect(mockInsertCoin).toHaveBeenCalledWith(5);
      expect(result).toEqual(mockResult);
    });

    it('should handle floating point values correctly', () => {
      // Setup mock return value
      const mockResult = { success: true, currentBalance: 0.5 };
      mockInsertCoin.mockReturnValue(mockResult);
      
      // Call the service method with a floating point value
      const result = vendingMachineService.insertCoin(0.5);
      
      // Verify the underlying method was called with the correct value
      expect(mockInsertCoin).toHaveBeenCalledWith(0.5);
      expect(result).toEqual(mockResult);
    });
  });

  describe('selectProduct', () => {
    it('should call vendingMachine.selectProduct with the correct productId', () => {
      // Setup mock return value
      const mockResult = { success: true, product: { id: '1', name: 'Test' } };
      mockSelectProduct.mockReturnValue(mockResult);
      
      // Call the service method
      const result = vendingMachineService.selectProduct('1');
      
      // Verify the underlying method was called with the correct ID
      expect(mockSelectProduct).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockResult);
    });
  });

  describe('completeTransaction', () => {
    it('should call vendingMachine.completeTransaction', () => {
      // Setup mock return value
      const mockResult = { 
        success: true, 
        dispensedProducts: [{ id: '1', name: 'Test' }], 
        change: [1, 0.5] 
      };
      mockCompleteTransaction.mockReturnValue(mockResult);
      
      // Call the service method
      const result = vendingMachineService.completeTransaction();
      
      // Verify the underlying method was called
      expect(mockCompleteTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('cancelTransaction', () => {
    it('should call vendingMachine.cancelTransaction', () => {
      // Setup mock return value
      const mockResult = { 
        success: true, 
        refundedAmount: 5, 
        refundedCoins: [5] 
      };
      mockCancelTransaction.mockReturnValue(mockResult);
      
      // Call the service method
      const result = vendingMachineService.cancelTransaction();
      
      // Verify the underlying method was called
      expect(mockCancelTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('getBalance', () => {
    it('should return the current balance from the vending machine', () => {
      // Setup mock property
      Object.defineProperty(vendingMachineServiceInstance.vendingMachine, 'balance', {
        value: 7.5,
        writable: true
      });
      
      // Call the service method
      const result = vendingMachineService.getBalance();
      
      // Verify the result is correct
      expect(result).toBe(7.5);
    });
  });
});
