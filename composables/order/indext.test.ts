import { describe, expect, it } from "vitest";
import { calculateItemCost, useOrderPrice } from "../order/index";
import type { OrderItem } from "../order/index";

describe("calculateItemCost", () => {
  it("calculates the item cost and delivery correctly", () => {
    const item: OrderItem = {
      sellingPrice: 10,
      deliveryPrice: 5,
      quantity: 3,
    };
    const result = calculateItemCost(item);
    expect(result.itemTotal).toBe(30);
    expect(result.itemDelivery).toBe(15);
  });
});

describe("useOrderPrice", () => {
  it("calculates the total order and delivery correctly", () => {
    const order: OrderItem[] = [
      {
        sellingPrice: 10,
        deliveryPrice: 5,
        quantity: 3,
      },
      {
        sellingPrice: 20,
        deliveryPrice: 10,
        quantity: 2,
      },
    ];
    const result = useOrderPrice(order);
    expect(result.totalOrder).toBe(105);
    expect(result.totalDelivery).toBe(35);

    const largeOrder: OrderItem[] = [
      {
        sellingPrice: 100,
        deliveryPrice: 50,
        quantity: 20,
      },
    ];
    const largeResult = useOrderPrice(largeOrder);
    expect(largeResult.totalOrder).toBe(3000 + 100);
    expect(largeResult.totalDelivery).toBe(1000 + 100);
  });
});
