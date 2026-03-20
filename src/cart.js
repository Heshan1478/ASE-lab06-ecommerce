class Cart {
  constructor(catalog, inventory = null) {
    this.catalog = catalog;
    this.inventory = inventory;
    this.items = {};
  }

  addItem(sku, quantity) {
    this._validateQuantity(quantity);
    const product = this._getProduct(sku);
    this._checkInventory(sku, quantity);
    this.items[sku] = { product, quantity };
  }

  removeItem(sku) {
    delete this.items[sku];
  }

  total() {
    return Object.values(this.items)
      .reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  }

  getItems() {
    return this.items;
  }

  //  private helpers 
  _validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity < 1)
      throw new Error('Quantity must be greater than 0');
  }

  _getProduct(sku) {
    const product = this.catalog.findBySku(sku);
    if (!product) throw new Error('Product not found');
    return product;
  }

  _checkInventory(sku, quantity) {
    if (!this.inventory) return;
    const available = this.inventory.getAvailable(sku);
    if (quantity > available) throw new Error('Insufficient inventory');
  }
}
module.exports = Cart;