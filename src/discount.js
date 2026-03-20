function bulkDiscount(items) {
  return items.map(item => {
    const lineTotal = item.price * item.quantity;
    return item.quantity >= 10 ? lineTotal * 0.90 : lineTotal;
  }).reduce((sum, val) => sum + val, 0);
}

function orderDiscount(subtotal) {
  return subtotal >= 1000 ? subtotal * 0.95 : subtotal;
}

function applyDiscounts(items) {
  const afterBulk = bulkDiscount(items);
  return orderDiscount(afterBulk);
}

module.exports = { applyDiscounts, bulkDiscount, orderDiscount };
