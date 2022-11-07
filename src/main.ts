import { RegexpTextToIdCollection } from "./model/reducer";
import { FsPdfFileSource } from "./model/source";

const pdfFileSource = new FsPdfFileSource();
const textToIdCollectionReducer = new RegexpTextToIdCollection();

const pdfContent = await pdfFileSource.ask({ path: "./pdf.pdf" });
const ids = textToIdCollectionReducer.reduce({ text: pdfContent });
console.log(ids);
