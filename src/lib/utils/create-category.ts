export function createCategory(pageData: PageData): CategoryNavigationData {
  const pathname = `/produtos/${pageData.id}`;
  const products: ProductNavigationData[] = [];
  for (const section of pageData.sections) {
    for (const product of section.products) {
      products.push({
        id: product.id,
        name: product.name,
        model: product.model,
        pathname: `${pathname}#${section.id}`,
      });
    }
  }

  return {
    title: pageData.title,
    pathname,
    products: products.sort((a, b) => a.name.localeCompare(b.name)),
  };
}
