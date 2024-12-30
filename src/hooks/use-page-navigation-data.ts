import { usePageData } from "./use-page-data";

export async function usePageNavigationData() {
  const { pageDataList } = await usePageData();
  const navigationDataList: PageNavigationData[] = pageDataList.map(
    (pageData) => {
      const pathname = `/produtos/${pageData.id}`;
      const pageNavigationData: PageNavigationData = {
        title: pageData.title,
        pathname,
        sections: pageData.sections.map((section) => ({
          title: section.title,
          pathname: `${pathname}#${section.id}`,
        })),
      };
      return pageNavigationData;
    }
  );
  return navigationDataList;
}
