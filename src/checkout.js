const { applyDiscounts } = require('./discount');
const Order = require('./order');

class Checkout {
  constructor(cart, inventory, paymentGateway, orderRepository = null) {
    this.cart = cart;
    this.inventory = inventory;
    this.paymentGateway = paymentGateway;
    this.orderRepository = orderRepository;
  }

  process(paymentToken) {
    // Step 1: Validate inventory
    const items = this.cart.getItems();
    for (const [sku, { quantity }] of Object.entries(items)) {
      const available = this.inventory.getAvailable(sku);
      if (quantity > available) {
        return { success: false, error: `Insufficient stock for ${sku}` };
      }
    }

    // Step 2: Calculate total with discounts
    const itemList = Object.values(items).map(({ product, quantity }) => ({
      price: product.price,
      quantity
    }));
    const total = applyDiscounts(itemList);

    // Step 3: Charge payment
    const paymentResult = this.paymentGateway.charge(total, paymentToken);
    if (!paymentResult.success) {
      return { success: false, error: `Payment failed: ${paymentResult.error}` };
    }

    // Step 4: Save order
    const order = new Order(items, total);
    if (this.orderRepository) this.orderRepository.save(order);

    return { success: true, total, order };
  }
}

module.exports = Checkout;
