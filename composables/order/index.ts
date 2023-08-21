export interface OrderItem {
  sellingPrice: number;
  quantity: number;
}
export interface OrderCoupon {
  id: string;
  value: number;
  type: "PERCENTAGE" | "FIXED";
}

export function useOrderPrice(order: OrderItem[]) {
  let total = order.reduce((acc, item) => {
    return acc + item.sellingPrice * item.quantity;
  }, 0);

  return total;
}
