import { RegexpTextToIdCollection } from "./model/reducer";
import { FsPdfFileSource } from "./model/source";

const pdfFileSource = new FsPdfFileSource();
const textToIdCollection = new RegexpTextToIdCollection();

const pdfContent = await pdfFileSource.ask({ path: "./pdf.pdf" });
const ids = textToIdCollection.reduce({ text: pdfContent });
console.log(ids);
