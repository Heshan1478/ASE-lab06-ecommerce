// REQUIREMENT F - Order + Repository Tests
const Checkout = require('../src/checkout');
const Order = require('../src/order');
const OrderRepository = require('../src/orderRepository');

describe('Order', () => {
  test('creates an order with id, items, total, and timestamp', () => {
    const items = { SKU001: { product: { sku: 'SKU001', price: 50 }, quantity: 2 } };
    const order = new Order(items, 100);
    expect(order.id).toBeDefined();
    expect(order.total).toBe(100);
    expect(order.createdAt).toBeDefined();
  });
});

describe('OrderRepository', () => {
  test('saves and retrieves orders', () => {
    const repo = new OrderRepository();
    const order = new Order({}, 100);
    repo.save(order);
    expect(repo.findAll().length).toBe(1);
  });

  test('finds order by id', () => {
    const repo = new OrderRepository();
    const order = new Order({}, 200);
    repo.save(order);
    expect(repo.findById(order.id)).toBe(order);
  });

  test('returns null for unknown order id', () => {
    const repo = new OrderRepository();
    expect(repo.findById('unknown')).toBeNull();
  });
});

describe('Checkout saves order on success', () => {
  test('saves order to repository after successful payment', () => {
    const mockCart = {
      getItems: jest.fn().mockReturnValue({
        SKU001: { product: { sku: 'SKU001', price: 50 }, quantity: 2 }
      })
    };
    const mockInventory = { getAvailable: jest.fn().mockReturnValue(10) };
    const mockPayment = { charge: jest.fn().mockReturnValue({ success: true }) };
    const repo = new OrderRepository();
    const checkout = new Checkout(mockCart, mockInventory, mockPayment, repo);

    checkout.process('token-123');

    expect(repo.findAll().length).toBe(1);
    expect(repo.findAll()[0].total).toBe(100);
  });

  test('does NOT save order when payment fails', () => {
    const mockCart = {
      getItems: jest.fn().mockReturnValue({
        SKU001: { product: { sku: 'SKU001', price: 50 }, quantity: 2 }
      })
    };
    const mockInventory = { getAvailable: jest.fn().mockReturnValue(10) };
    const mockPayment = { charge: jest.fn().mockReturnValue({ success: false, error: 'Declined' }) };
    const repo = new OrderRepository();
    const checkout = new Checkout(mockCart, mockInventory, mockPayment, repo);

    checkout.process('bad-token');

    expect(repo.findAll().length).toBe(0);
  });
});
