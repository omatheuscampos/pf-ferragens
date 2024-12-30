export function groupProductsByName(products: Product[]) {
  const productsByName: ProductsByName = {};
  for (const product of products) {
    const names = product.name.split(" ");
    const firstName = names[0];

    if (!productsByName[firstName]) {
      productsByName[firstName] = [];
    }
    productsByName[firstName].push(product);
  }
  return productsByName;
}
