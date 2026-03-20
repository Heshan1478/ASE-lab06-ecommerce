class Order {
  constructor(items, total) {
    this.id = Date.now().toString();
    this.items = items;
    this.total = total;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Order;
