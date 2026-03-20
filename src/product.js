class Product {
  constructor(sku, name, price) {
    if (!sku) throw new Error('SKU is required');
    if (typeof price === 'undefined') throw new Error('Price is required');
    if (price < 0) throw new Error('Price must be non-negative');
    if (!name) throw new Error('Name is required');
    this.sku = sku;
    this.name = name;
    this.price = price;
  }
}

module.exports = Product;
