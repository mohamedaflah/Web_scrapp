import { Parser } from "json2csv";
import * as fs from "fs";
import { Detail } from "../../types/userDetail";

const fields = [
  "name",
  "mobile",
  "company_name",
  "category",
  "visitCardUrl",
  "email",
];
const opts = { fields };
export const generateCSV = (jsonData: Detail[]) => {
  console.log("generating CSV");

  try {
    const parser = new Parser<Detail>(opts);

    const csv = parser.parse(jsonData);

    fs.writeFileSync("output.csv", csv);

    console.log("CSV file has been created successfully.");
  } catch (err) {
    console.error(err);
  }
};
