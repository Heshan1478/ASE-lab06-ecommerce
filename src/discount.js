const BULK_THRESHOLD = 10;
const BULK_RATE = 0.10;
const ORDER_THRESHOLD = 1000;
const ORDER_RATE = 0.05;

function bulkDiscount(items) {
  return items.reduce((sum, item) => {
    const lineTotal = item.price * item.quantity;
    const discount = item.quantity >= BULK_THRESHOLD ? lineTotal * BULK_RATE : 0;
    return sum + lineTotal - discount;
  }, 0);
}

function orderDiscount(subtotal) {
  return subtotal >= ORDER_THRESHOLD ? subtotal * (1 - ORDER_RATE) : subtotal;
}

function applyDiscounts(items) {
  const afterBulk = bulkDiscount(items);
  return orderDiscount(afterBulk);
}

module.exports = { applyDiscounts, bulkDiscount, orderDiscount };