import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export function getGoogleAuthJWT(scopes: string | string[]): OAuth2Client {
  const auth = new google.auth.JWT({
    scopes,
    email: process.env.CLIENT_EMAIL,
    key: process.env.PRIVATE_KEY,
  });
  return auth;
}

export function createGoogleSheetsClient(spreadsheetId: string) {
  const auth = getGoogleAuthJWT([
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  const client = google.sheets({
    version: "v4",
    auth,
  });

  async function getRecordsByRange(range: string): Promise<string[][]> {
    const response = await client.spreadsheets.values.get({
      range,
      spreadsheetId,
    });
    return response.data.values || [];
  }

  return {
    getRecordsByRange,
  };
}
