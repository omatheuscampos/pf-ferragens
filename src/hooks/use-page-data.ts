import { groupProductsByCategory } from "@/lib/utils/group-products-by-category";
import { useProducts } from "./use-products";
import { mapProductsToSectionsByCategory } from "@/lib/utils/map-products-to-sections-by-category";
import { removeAccentsAndSpecialChars } from "@/lib/utils/remove-accents-and-special-chars";

export async function usePageData() {
  const products = await useProducts();
  const productsByCategory = groupProductsByCategory(products);
  const productSections = mapProductsToSectionsByCategory(productsByCategory);
  const pageDataList = Object.entries(productSections).map(
    ([title, sections]) => ({
      id: removeAccentsAndSpecialChars(title),
      title,
      sections,
    })
  );

  function getPageDataById(id: string): PageData {
    const pageData = pageDataList.find((pageData) => pageData.id === id);
    if (!pageData) {
      throw new Error(`Page data not found for id: ${id}`);
    }
    return pageData;
  }

  return {
    pageDataList,
    getPageDataById,
  };
}
