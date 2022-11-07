import { z } from "zod";

export type PdfFileParameters = { path: string };

export const pdfFileParser = z.string();

export type PdfFile = z.infer<typeof pdfFileParser>;
