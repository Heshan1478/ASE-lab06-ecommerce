class Order {
  constructor(items, total) {
    this._validate(items, total);
    this.id = `ORD-${Date.now()}`;
    this.items = items;
    this.total = total;
    this.createdAt = new Date().toISOString();
  }

  // Validation extracted into its own method
  _validate(items, total) {
    if (!items || typeof items !== 'object') throw new Error('Items are required');
    if (typeof total !== 'number' || total < 0) throw new Error('Total must be a non-negative number');
  }

  // Helper method to get a clean summary of the order
  getSummary() {
    return {
      id: this.id,
      total: this.total,
      createdAt: this.createdAt
    };
  }
}

module.exports = Order;