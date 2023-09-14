import { config } from "dotenv";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

config()

const serviceAccountAuth = new JWT({
    email: process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"] || '',
    key: process.env["GOOGLE_PRIVATE_KEY"]?.replace(/\\n/g, '\n') || '',
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
});
  
export const doc = new GoogleSpreadsheet(process.env["GOOGLE_SPREADSHEET_ID"] || '', serviceAccountAuth)
