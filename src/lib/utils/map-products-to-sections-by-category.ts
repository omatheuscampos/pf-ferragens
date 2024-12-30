import { groupProductsByName } from "./group-products-by-name";
import { createSections } from "./create-sections";

export function mapProductsToSectionsByCategory(
  productsByCategory: ProductsByCategory
) {
  const productSectionsByCategory: ProductSectionsByCategory = {};
  for (const [categoryName, products] of Object.entries(productsByCategory)) {
    const productsByName = groupProductsByName(products);
    const sections = createSections(productsByName);
    productSectionsByCategory[categoryName] = sections;
  }
  return productSectionsByCategory;
}
