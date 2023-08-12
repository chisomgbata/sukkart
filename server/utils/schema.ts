import {
  sqliteTable,
  text,
  integer,
  unique,
  int,
} from "drizzle-orm/sqlite-core";
import { InferModel, sql } from "drizzle-orm";

export const productTable = sqliteTable("product", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  status: text("status", {
    enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
  })
    .notNull()
    .default("DRAFT"),
  name: text("name").notNull(),
  stock: integer("stock").notNull().default(1),
  slug: text("slug").notNull().unique(),
  costPrice: integer("costPrice").notNull(),
  image: text("image").notNull(),
  sellingPrice: integer("sellingPrice"),
  description: text("description").notNull(),
  featured: integer("featured", {
    mode: "boolean",
  }).default(false),

  createdAt: integer("createdAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type Product = InferModel<typeof productTable, "select">;
export type ProductInsert = InferModel<typeof productTable, "insert">;

export const categoryTable = sqliteTable("category", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  status: text("status", {
    enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
  })
    .notNull()
    .default("DRAFT"),
  name: text("name").notNull(),
  image: text("image").notNull(),
  slug: text("slug").notNull().unique(),

  createdAt: integer("creatdAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type Category = InferModel<typeof categoryTable, "select">;
export type CategoryInsert = InferModel<typeof categoryTable, "insert">;

export const productCategoryTable = sqliteTable(
  "productCategory",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),

    productId: int("productId")
      .notNull()
      .references(() => productTable.id),
    categoryId: int("categoryId")
      .notNull()
      .references(() => categoryTable.id),
    createdAt: integer("createdAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      uniqueKey: unique().on(table.productId, table.categoryId),
    };
  }
);

export type ProductCategory = InferModel<typeof productCategoryTable, "select">;
export type ProductCategoryInsert = InferModel<
  typeof productCategoryTable,
  "insert"
>;

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  avatar: text("avatar").notNull().default("default"),
  email: text("email").notNull().unique(),
  password: text("password"),

  createdAt: integer("createdAt", {
    mode: "timestamp",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type User = InferModel<typeof userTable, "select">;
export type UserInsert = InferModel<typeof userTable, "insert">;

export const couponTable = sqliteTable("coupon", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  code: text("code").notNull().unique(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  maxUses: integer("maxUses").notNull().default(1),
  value: integer("value").notNull(),
  status: text("status").notNull().default("DRAFT"),
  openToAll: integer("openToAll", {
    mode: "boolean",
  }).default(false),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type Coupon = InferModel<typeof couponTable, "select">;
export type CouponInsert = InferModel<typeof couponTable, "insert">;

export const couponUserTable = sqliteTable(
  "couponUser",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),
    couponId: text("couponId").notNull(),
    userId: text("userId").notNull(),
    createdAt: integer("createdAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      unq1: unique().on(table.couponId, table.userId),
    };
  }
);

export type CouponUser = InferModel<typeof couponUserTable, "select">;
export type CouponUserInsert = InferModel<typeof couponUserTable, "insert">;

export const couponUsageTable = sqliteTable(
  "couponUsage",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),
    couponId: text("couponId").notNull(),
    userId: text("userId").notNull(),
    createdAt: integer("createdAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      uniqueKey: unique().on(table.couponId, table.userId),
    };
  }
);

export type CouponUsage = InferModel<typeof couponUsageTable, "select">;
export type CouponUsageInsert = InferModel<typeof couponUsageTable, "insert">;

export const orderTable = sqliteTable("order", {
  id: text("id").primaryKey(),
  status: text("status", {
    enum: ["PLACED", "PAID", "DISPATCHED", "PAYMENT_CANCELLED", "DELIVERED"],
  })
    .notNull()
    .default("PLACED"),
  total: integer("total").notNull(),
  userId: text("userId")
    .references(() => userTable.id)
    .notNull(),
  paymentUrl: text("paymentUrl"),
  reference: text("reference").notNull().unique(),
  verificationCode: text("verificationCode").notNull(),
  type: text("type", {
    enum: ["ONLINE", "PAY_ON_DELIVERY"],
  })
    .notNull()
    .default("ONLINE"),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  addressId: int("addressId")
    .references(() => addressTable.id)
    .notNull(),
});

export type Order = InferModel<typeof orderTable, "select">;
export type OrderInsert = InferModel<typeof orderTable, "insert">;

export const orderItemTable = sqliteTable("orderItem", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  quantity: integer("quantity").notNull(),
  productId: int("productId")
    .references(() => productTable.id)
    .notNull(),
  price: integer("price").notNull(),
  orderId: text("orderId")
    .references(() => orderTable.id)
    .notNull(),
});

export type OrderItem = InferModel<typeof orderItemTable, "select">;
export type OrderItemInsert = InferModel<typeof orderItemTable, "insert">;

export const addressTable = sqliteTable("address", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  phoneNumber: text("phoneNumber").notNull(),
  lodge: text("lodge").notNull(),
  area: text("area").notNull(),
  user: text("userId")
    .references(() => userTable.id)
    .notNull(),
});

export type Address = InferModel<typeof addressTable, "select">;
export type AddressInsert = InferModel<typeof addressTable, "insert">;

export const cartItemTable = sqliteTable(
  "cartItem",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),
    quantity: integer("quantity").notNull(),
    productId: int("productId")
      .references(() => productTable.id)
      .notNull(),
    userId: text("userId")
      .references(() => userTable.id)
      .notNull(),
    createdAt: integer("createdAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      uniqueKey: unique().on(table.productId, table.userId),
    };
  }
);

export type CartItem = InferModel<typeof cartItemTable, "select">;
export type CartItemInsert = InferModel<typeof cartItemTable, "insert">;

export const customRequestTable = sqliteTable("customRequest", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type CustomRequest = InferModel<typeof customRequestTable, "select">;
export type CustomRequestInsert = InferModel<
  typeof customRequestTable,
  "insert"
>;

export const productImagesTable = sqliteTable(
  "productImages",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),
    image: text("image").notNull(),
    productId: int("productId")
      .notNull()
      .references(() => productTable.id),
    createdAt: integer("createdAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {
      mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      uniqueKey: unique().on(table.productId, table.image),
    };
  }
);

export type ProductImages = InferModel<typeof productImagesTable, "select">;
export type ProductImagesInsert = InferModel<
  typeof productImagesTable,
  "insert"
>;

export const couponConditionTable = sqliteTable("couponCondition", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  couponId: text("couponId").notNull().unique(),
  minAmount: integer("minAmount").notNull(),
  maxAmount: integer("maxAmount"),
  startDate: integer("startDate", {
    mode: "timestamp",
  }).notNull(),
  endDate: integer("endDate", {
    mode: "timestamp",
  }).notNull(),

  createdAt: integer("createdAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type CouponCondition = InferModel<typeof couponConditionTable, "select">;
export type CouponConditionInsert = InferModel<
  typeof couponConditionTable,
  "insert"
>;
