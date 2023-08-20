import type {
  CategoryInsert,
  ProductCategoryInsert,
  ProductInsert,
} from "server/utils/schema";
import { ProductImagesInsert } from "server/utils/schema";

export default defineEventHandler(async (event) => {
  console.log("Seeding database...");

  await seeder.transaction(async (tx) => {
    console.log("Deleteing Cart Table");
    await tx.delete(cartItemTable).run();

    console.log("Deleteing User Table");
    await tx.delete(userTable).run();

    console.log("Deleteing Categories Table");
    await tx.delete(categoryTable).run();

    console.log("Deleteing Products Table");
    await tx.delete(productTable).run();

    console.log("Deleteing Product Images Table");

    await tx.delete(productImagesTable).run();

    console.log("Deleteing Product Categories Table");
    await tx.delete(productCategoryTable).run();
  });

  const categoriesToInsert: CategoryInsert[] = Array.from({ length: 100 }).map(
    (_, i) => ({
      name: `Category ${i}`,
      image: `https://picsum.photos/seed/${i}/200/300`,
      slug: `category-${i}`,
    })
  );

  const productToInsert: ProductInsert[] = Array.from({ length: 1000 }).map(
    (_, i) => ({
      name: `Product ${i}`,
      costPrice: Math.floor(Math.random() * 1000),
      price: Math.floor(Math.random() * 1000),
      description: `Description ${i}`,
      image: `/products/44ec78ec-84fb-422e-a264-76d37bcb38e0.jpg`,
      slug: `product-${i}`,
    })
  );

  const productImageToInsert: ProductImagesInsert[] = Array.from({
    length: 5,
  }).map((_, i) => ({
    productId: 1,
    image: `https://picsum.photos/seed/${i}/200/300`,
  }));

  const productCategoryToInsert: ProductCategoryInsert[] = Array.from({
    length: 10000,
  }).map((_, i) => ({
    productId: Math.floor(Math.random() * 1000) + 1,
    categoryId: Math.floor(Math.random() * 100) + 1,
  }));

  await seeder.transaction(async (tx) => {
    console.log("Inserting Products...");
    await tx.insert(productTable).values(productToInsert).run();

    console.log("Inserting Product Images...");
    await tx.insert(productImagesTable).values(productImageToInsert).run();
  });

  await seeder.transaction(async (tx) => {
    console.log("Inserting Categories...");
    await tx.insert(categoryTable).values(categoriesToInsert).run();

    console.log("Inserting Product Categories...");
    await tx
      .insert(productCategoryTable)
      .values(productCategoryToInsert)
      .onConflictDoNothing()
      .run();
  });

  console.log("Creating User ...");
  await seeder.transaction(async (tx) => {
    await tx.delete(userTable).run();
    await tx
      .insert(userTable)
      .values({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: await hash("password"),
      })
      .run();
  });

  console.log("Create 2 cartItems for user 1");

  const values = Array.from({ length: 3 }).map((_, i) => ({
    userId: "1",
    productId: 1,
    quantity: Math.floor(Math.random() * 10),
  }));

  await seeder.transaction(async (tx) => {
    await tx.delete(cartItemTable).run();
    await tx.insert(cartItemTable).values(values).onConflictDoNothing().run();
  });

  return {
    message: "success",
  };
});
