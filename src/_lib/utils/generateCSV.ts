import { Parser } from "json2csv";
import * as fs from "fs";

// Define the type for your JSON data
interface Detail {
  name: string;
  mobile: string;
  company_name: string;
  category: string;
  visitCardUrl: string;
  email: string;
}

// Sample JSON data
// Fields to be included in the CSV
const fields = ["name", "mobile", "company_name", "category", "visitCardUrl","email"];
const opts = { fields };
export const generateCSV = (jsonData: Detail[]) => {
  console.log("generating CSV");
  
  try {
    // Create a new parser with the specified fields
    const parser = new Parser<Detail>(opts);

    // Convert JSON data to CSV
    const csv = parser.parse(jsonData);

    // Write CSV data to a file
    fs.writeFileSync("output.csv", csv);

    console.log("CSV file has been created successfully.");
  } catch (err) {
    console.error(err);
  }
};
