// REQUIREMENT A - Product Tests (RED then GREEN)
const Product = require('../src/product');

describe('Product', () => {
  // GREEN: these pass after product.js is created
  test('creates a product with valid inputs', () => {
    const p = new Product('SKU001', 'Laptop', 999.99);
    expect(p.sku).toBe('SKU001');
    expect(p.name).toBe('Laptop');
    expect(p.price).toBe(999.99);
  });

  test('throws error when price is negative', () => {
    expect(() => new Product('SKU001', 'Laptop', -10))
      .toThrow('Price must be non-negative');
  });

  test('throws error when sku is missing', () => {
    expect(() => new Product('', 'Laptop', 10))
      .toThrow('SKU is required');
  });

  test('throws error when name is missing', () => {
    expect(() => new Product('SKU001', '', 10))
      .toThrow('Name is required');
  });

  test('throws error when price is missing', () => {
    expect(() => new Product('SKU001', 'Laptop'))
      .toThrow('Price is required');
  });
});
