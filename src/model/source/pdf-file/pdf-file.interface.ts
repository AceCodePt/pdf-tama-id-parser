import { ISource } from "../source.interface";
import { PdfFile, PdfFileParameters } from "./types";

export interface IPdfFileSource extends ISource<Promise<PdfFile>, PdfFileParameters> {}
