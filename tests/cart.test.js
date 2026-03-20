// REQUIREMENT B - Cart Tests
const Cart = require('../src/cart');
const Product = require('../src/product');
const Catalog = require('../src/catalog');

describe('Cart', () => {
  let cart, catalog;

  beforeEach(() => {
    catalog = new Catalog();
    catalog.add(new Product('SKU001', 'Laptop', 999.99));
    catalog.add(new Product('SKU002', 'Mouse', 29.99));
    cart = new Cart(catalog);
  });

  test('adds item and calculates total', () => {
    cart.addItem('SKU001', 2);
    expect(cart.total()).toBeCloseTo(1999.98);
  });

  test('removes item from cart', () => {
    cart.addItem('SKU001', 1);
    cart.removeItem('SKU001');
    expect(cart.total()).toBe(0);
  });

  test('throws error for unknown SKU', () => {
    expect(() => cart.addItem('UNKNOWN', 1))
      .toThrow('Product not found');
  });

  test('throws error for quantity less than 1', () => {
    expect(() => cart.addItem('SKU001', 0))
      .toThrow('Quantity must be greater than 0');
  });

  test('throws error for non-integer quantity', () => {
    expect(() => cart.addItem('SKU001', 1.5))
      .toThrow('Quantity must be greater than 0');
  });

  test('totals multiple items correctly', () => {
    cart.addItem('SKU001', 1);
    cart.addItem('SKU002', 3);
    expect(cart.total()).toBeCloseTo(1089.96);
  });
});
