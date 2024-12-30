import { createProductsClient } from "@/lib/utils/products-client";

export async function GET() {
  const productsClient = createProductsClient();
  const products = await productsClient.listAll();
  return Response.json(products);
}
