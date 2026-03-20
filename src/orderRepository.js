class OrderRepository {
  constructor() {
    this.orders = [];
  }

  save(order) {
    this.orders.push(order);
  }

  findAll() {
    return this.orders;
  }

  findById(id) {
    return this.orders.find(o => o.id === id) || null;
  }
}

module.exports = OrderRepository;
