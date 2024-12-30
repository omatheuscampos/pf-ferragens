import { createGoogleSheetsClient } from "../google-sheets";
import { serializeProduct } from "./serialize-product";

export function createProductsClient() {
  const spreadsheetId = process.env.SPREADSHEET_ID || "";
  const client = createGoogleSheetsClient(spreadsheetId);
  const allRecordsExceptTheHeader = "Produtos-2.0!A2:G";
  async function listAll(): Promise<ProductResponse[]> {
    const records = await client.getRecordsByRange(allRecordsExceptTheHeader);
    const products = records.map(serializeProduct);
    return products;
  }
  return {
    listAll,
  };
}
