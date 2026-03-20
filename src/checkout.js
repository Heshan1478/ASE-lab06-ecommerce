const { applyDiscounts } = require('./discount');
const Order = require('./order');

class Checkout {
  constructor(cart, inventory, paymentGateway, orderRepository = null) {
    this.cart = cart;
    this.inventory = inventory;
    this.paymentGateway = paymentGateway;
    this.orderRepository = orderRepository;
  }

  // Main process method — now clean and easy to read
  process(paymentToken) {
    const items = this.cart.getItems();

    const inventoryError = this._validateInventory(items);
    if (inventoryError) return inventoryError;

    const total = this._calculateTotal(items);

    const paymentError = this._chargePayment(total, paymentToken);
    if (paymentError) return paymentError;

    return this._createOrder(items, total);
  }

  // Step 1: Check all items have enough stock
  _validateInventory(items) {
    for (const [sku, { quantity }] of Object.entries(items)) {
      const available = this.inventory.getAvailable(sku);
      if (quantity > available) {
        return { success: false, error: `Insufficient stock for ${sku}` };
      }
    }
    return null; // no error
  }

  // Step 2: Calculate total price after discounts
  _calculateTotal(items) {
    const itemList = Object.values(items).map(({ product, quantity }) => ({
      price: product.price,
      quantity
    }));
    return applyDiscounts(itemList);
  }

  // Step 3: Attempt to charge the payment gateway
  _chargePayment(total, paymentToken) {
    const result = this.paymentGateway.charge(total, paymentToken);
    if (!result.success) {
      return { success: false, error: `Payment failed: ${result.error}` };
    }
    return null; // no error
  }

  // Step 4: Create and save the order
  _createOrder(items, total) {
    const order = new Order(items, total);
    if (this.orderRepository) this.orderRepository.save(order);
    return { success: true, total, order };
  }
}

module.exports = Checkout;