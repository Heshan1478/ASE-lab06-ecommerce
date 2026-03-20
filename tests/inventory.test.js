// REQUIREMENT C - Inventory Tests
const Cart = require('../src/cart');
const Product = require('../src/product');
const Catalog = require('../src/catalog');

describe('Cart with Inventory', () => {
  let cart, catalog, mockInventory;

  beforeEach(() => {
    catalog = new Catalog();
    catalog.add(new Product('SKU001', 'Laptop', 999.99));
    mockInventory = { getAvailable: jest.fn() };
    cart = new Cart(catalog, mockInventory);
  });

  test('allows add when inventory is sufficient', () => {
    mockInventory.getAvailable.mockReturnValue(10);
    expect(() => cart.addItem('SKU001', 3)).not.toThrow();
  });

  test('throws error when quantity exceeds available stock', () => {
    mockInventory.getAvailable.mockReturnValue(2);
    expect(() => cart.addItem('SKU001', 5))
      .toThrow('Insufficient inventory');
  });

  test('allows add when quantity equals available stock', () => {
    mockInventory.getAvailable.mockReturnValue(5);
    expect(() => cart.addItem('SKU001', 5)).not.toThrow();
  });
});
