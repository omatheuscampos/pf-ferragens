export function groupProductsByCategory(products: ProductResponse[]) {
  const productsByCategory: ProductsByCategory = {};
  for (const product of products) {
    const categoryName = product.category;
    if (!productsByCategory[categoryName]) {
      productsByCategory[categoryName] = [];
    }
    productsByCategory[categoryName].push(product);
  }
  return productsByCategory;
}
