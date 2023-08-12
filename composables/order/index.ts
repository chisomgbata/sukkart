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

  // if (coupon) {
  //   switch (coupon.type) {
  //     case "FIXED":
  //       return {
  //         totalOrder: total - coupon.value > 0 ? total - coupon.value : 0,
  //         discount: coupon.value,
  //       };
  //     case "PERCENTAGE":
  //       return {
  //         totalOrder:
  //           total - (total * coupon.value) / 100 > 0
  //             ? total - (total * coupon.value) / 100
  //             : 0,
  //         discount: (total * coupon.value) / 100,
  //       };
  //   }
  // }

  // return {
  //   totalOrder: total,
  //   discount: 0,
  // };
  return total;
}
