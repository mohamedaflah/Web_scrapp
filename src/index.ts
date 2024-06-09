import express from "express";
const app = express();

import { generateCSV } from "./_lib/utils/generateCSV";
import { getDetails } from "./_lib/utils/scrappData";

getDetails().then((details) => {
  console.log("🚀 ~ details:", details);
  generateCSV(details);
});
app.listen(3000, () => {
  console.log("server started");
});
