import fs from "fs/promises";
import PdfParse from "pdf-parse";
import { PdfFileFailedException, PdfFileNotFoundException, PdfFileParseException } from "./exceptions";
import { IPdfFileSource } from "./pdf-file.interface";
import { PdfFile, PdfFileParameters } from "./types";

export class FsPdfFileSource implements IPdfFileSource {
	async ask(parameters: PdfFileParameters): Promise<PdfFile> {
		const buffer = await fs.readFile(parameters.path).catch((e) => {
			throw new PdfFileFailedException(`Failed to read the pdf-file using FS because of: ${e}`);
		});
		if (buffer.length === 0) {
			throw new PdfFileNotFoundException(
				`Failed to receive a pdf-file with content in it at dir ${parameters.path}`,
			);
		}
		const pdfContent = await PdfParse(buffer)
			.then((pdfResult) => pdfResult.text)
			.catch((e) => {
				throw new PdfFileParseException(`The pdf-file content received from FS is malformed because of: ${e}`);
			});
		return pdfContent;
	}
}
