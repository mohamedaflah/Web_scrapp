import { JSDOM } from "jsdom";
import axios from "axios";
const details: any = [];
export async function getDetails() {
  console.clear();
  const { data } = await axios.get(
    `https://www.qatarcontact.com/search?page=1`
  );
  const { document } = new JSDOM(data).window;
  let lastNumber = document.querySelectorAll(".page-numbers");
  let lastN = lastNumber[lastNumber.length - 2].textContent;
  for (let i = 1; i <= Number(lastN); i++) {
    console.log("fetching data on Page : ", i);

    const { data: detailsdata } = await axios.get(
      `https://www.qatarcontact.com/search?page=${i}`
    );
    const { document } = new JSDOM(detailsdata).window;
    const detailslist = document.querySelectorAll(
      ".atbd_single_listing_wrapper"
    );
    let j = 0;

    while (j < detailslist.length) {
      const emaildome = detailslist?.[j]
        .querySelector(".atbd_listing_title a")
        ?.getAttribute("href");

      const { data: emaildata } = await axios.get(String(emaildome));
      const { document } = new JSDOM(emaildata).window;

      const email = document.querySelectorAll(".atbd_info")[2].textContent;

      details.push({
        name: detailslist?.[j]
          ?.querySelectorAll(
            ".atbd_listing_info .atbd_content_upper .atbd_listing_data_list ul li"
          )?.[0]
          ?.textContent?.trim(),
        mobile: detailslist?.[j]
          ?.querySelectorAll(".atbd_listing_data_list ul li")?.[1]
          ?.textContent?.trim(),
        company_name: detailslist[j]
          .querySelectorAll(".atbd_listing_title a")[0]
          ?.textContent?.trim(),
        category: detailslist[j]
          ?.querySelector(".atbd_listing_category a")
          ?.textContent?.trim(),
        visitCardUrl: (
          detailslist[j].querySelector(
            ".atbd_listing_image a:nth-child(2) img"
          ) as HTMLImageElement
        )?.src,
        email,
      });
      j++;
    }
    return details;
  }
}
