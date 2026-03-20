// REQUIREMENT D - Discount Tests
const { applyDiscounts, bulkDiscount, orderDiscount } = require('../src/discount');

describe('Discount Rules', () => {
  test('applies 10% bulk discount when quantity >= 10', () => {
    const items = [{ price: 50, quantity: 10 }];
    expect(applyDiscounts(items)).toBeCloseTo(450); // 500 - 10%
  });

  test('no bulk discount when quantity < 10', () => {
    const items = [{ price: 50, quantity: 5 }];
    expect(applyDiscounts(items)).toBeCloseTo(250);
  });

  test('applies 5% order discount when total >= 1000', () => {
    const items = [{ price: 200, quantity: 6 }];
    expect(applyDiscounts(items)).toBeCloseTo(1140); // 1200 - 5%
  });

  test('applies both bulk and order discounts together', () => {
    const items = [{ price: 120, quantity: 10 }];
    // 120*10=1200, bulk: 1080, order: 1080*0.95=1026
    expect(applyDiscounts(items)).toBeCloseTo(1026);
  });

  test('no discounts when quantity < 10 and total < 1000', () => {
    const items = [{ price: 50, quantity: 3 }];
    expect(applyDiscounts(items)).toBeCloseTo(150);
  });
});
