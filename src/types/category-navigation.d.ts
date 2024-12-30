interface CategoryNavigationData {
  title: string;
  pathname: string;
  products: ProductNavigationData[];
}

interface ProductNavigationData {
  id: string;
  name: string;
  model: string;
  pathname: string;
}
