// REQUIREMENT A - Catalog Tests
const Catalog = require('../src/catalog');
const Product = require('../src/product');

describe('Catalog', () => {
  let catalog;

  beforeEach(() => {
    catalog = new Catalog();
  });

  test('adds and retrieves a product by SKU', () => {
    const product = new Product('SKU001', 'Laptop', 999.99);
    catalog.add(product);
    expect(catalog.findBySku('SKU001')).toBe(product);
  });

  test('returns null for a missing SKU', () => {
    expect(catalog.findBySku('NOTEXIST')).toBeNull();
  });

  test('can store multiple products', () => {
    const p1 = new Product('SKU001', 'Laptop', 999.99);
    const p2 = new Product('SKU002', 'Mouse', 29.99);
    catalog.add(p1);
    catalog.add(p2);
    expect(catalog.findBySku('SKU001')).toBe(p1);
    expect(catalog.findBySku('SKU002')).toBe(p2);
  });
});
