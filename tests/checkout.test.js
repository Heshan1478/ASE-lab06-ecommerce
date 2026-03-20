// REQUIREMENT E - Checkout Tests
const Checkout = require('../src/checkout');

describe('Checkout', () => {
  let mockCart, mockPaymentGateway, mockInventory, checkout;

  beforeEach(() => {
    mockCart = {
      getItems: jest.fn().mockReturnValue({
        SKU001: { product: { sku: 'SKU001', price: 100 }, quantity: 2 }
      }),
      total: jest.fn().mockReturnValue(200)
    };
    mockInventory = { getAvailable: jest.fn().mockReturnValue(10) };
    mockPaymentGateway = { charge: jest.fn() };
    checkout = new Checkout(mockCart, mockInventory, mockPaymentGateway);
  });

  test('successful checkout charges payment and returns success', () => {
    mockPaymentGateway.charge.mockReturnValue({ success: true });
    const result = checkout.process('token-abc');
    expect(mockPaymentGateway.charge).toHaveBeenCalledWith(200, 'token-abc');
    expect(result.success).toBe(true);
  });

  test('payment failure returns error without creating order', () => {
    mockPaymentGateway.charge.mockReturnValue({ success: false, error: 'Declined' });
    const result = checkout.process('bad-token');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Payment failed: Declined');
  });

  test('insufficient inventory returns error', () => {
    mockInventory.getAvailable.mockReturnValue(1);
    mockCart.getItems.mockReturnValue({
      SKU001: { product: { sku: 'SKU001', price: 100 }, quantity: 5 }
    });
    const result = checkout.process('token-abc');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Insufficient stock');
  });
});
