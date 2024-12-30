import {
  ProductSection,
  ProductSectionContent,
  ProductSectionTitle,
} from "./_components/product-section";
import { ProductCard } from "./_components/product-card";
import { usePageData } from "@/hooks/use-page-data";

// tempo de cache do Next.js em segundos, equivalente a 1 dia
export const revalidate = 24 * 60 * 60;
// quando false, retorna error 404 se não encontrar o id
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const { pageDataList } = await usePageData();
  return pageDataList.map((pageData) => ({ id: pageData.id }));
};

export default async function Page(props: PageProps) {
  const { id } = await props.params;
  const { getPageDataById } = await usePageData();
  const pageData = getPageDataById(id);
  return (
    <div className="max-w-screen flex flex-col py-6 md:pb-16 md:pt-10 gap-6 md:gap-10">
      {pageData.sections.map((section) => (
        <ProductSection key={section.id} id={section.id}>
          <ProductSectionTitle>{section.title}</ProductSectionTitle>
          <ProductSectionContent>
            {section.products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductSectionContent>
        </ProductSection>
      ))}
    </div>
  );
}
