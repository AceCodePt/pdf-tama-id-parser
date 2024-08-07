import fs from "fs/promises";
import PdfParse from "pdf-parse";

const expectedPdfFileLocation = process.argv.at(2);
if (!expectedPdfFileLocation || expectedPdfFileLocation.slice(-3) !== "pdf") {
  console.error(`Must provide file with pdf file extension`);
  process.exit(1);
}
console.log("Found the file", expectedPdfFileLocation);
const pdfContent = await getPdfFile(expectedPdfFileLocation);
const ids = reduceToTextId(pdfContent);
console.log("hii", ids[0]);
getData("25373341");

async function getPdfFile(path: string) {
  const buffer = await fs.readFile(path).catch((e) => {
    throw new Error(`Failed to read the pdf-file using FS because of: ${e}`);
  });
  if (buffer.length === 0) {
    throw new Error(`Failed to receive a pdf-file with content in it at dir ${path}`);
  }
  const pdfContent = await PdfParse(buffer)
    .then((pdfResult) => pdfResult.text)
    .catch((e) => {
      throw new Error(`The pdf-file content received from FS is malformed because of: ${e}`);
    });
  return pdfContent;
}

function reduceToTextId(text: string) {
  const ids: Set<string> = new Set();
  for (let line of text.split("\n")) {
    const numbers = /\d{9}(?=ת\.ז)/g.exec(line) ?? [];
    if (numbers.length >= 1) {
      numbers.forEach((value) => ids.add(value));
    }
  }

  return [...ids];
}

async function getData(userId: string) {
  let responseText: string = "";
  try {
    responseText = await fetch("http://127.0.0.1:18000/", {
      credentials: "omit",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "text/plain;charset=UTF-8",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
      },
      referrer: "http://127.0.0.1:18000/",
      body: `year=New2&startfrom=0&p1=${userId}&p2=&p3=&p4=&p5=&p6=&p7=&p40=0`,
      method: "POST",
      mode: "cors",
    }).then((res) => res.text());
  } catch (error) {
    responseText = error;
    console.log(error.toString());
    console.log(error.message);
    console.log(error.cause);
    console.log(JSON.stringify(error.cause));
    console.log(error.cause.data);
    console.log(error.cause.data.toString());
    console.log(JSON.stringify(error.cause.data));
  }
  // console.log(responseText);
  return [...(/((05\d)|(0\d))-\d{7}/g.exec(responseText) || [])];
}
