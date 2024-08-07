import fs from "fs/promises";
import PdfParse from "pdf-parse";

const pdfContent = await getPdfFile("./pdf.pdf");
const ids = reduceToTextId(pdfContent);
console.log(ids);

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
