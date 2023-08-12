// export const productTransform = (product: ProductTransform) => {
//   const { id, name, slug, description, stock, sellingPrice } = product;
//   return {
//     id,
//     name,
//     slug,
//     description,
//     stock,
//     price: sellingPrice || calcPrice(product.costPrice).price,
//     images: product.ProductImages.map((image) => image.image),
//   };
// };

interface Product {
  id: number;
  name: string;
  slug: string;
  sellingPrice: number | null;
  costPrice: number;
  image: string;
}

export const productsTransform = (products: Product[]) => {
  return products.map((product) => minimalProductTransform(product));
};

export const minimalProductTransform = (product: Product) => {
  const { id, name, slug, sellingPrice, image } = product;
  return {
    id,
    name,
    image,
    slug,
    price: sellingPrice || calcPrice(product.costPrice),
  };
};
