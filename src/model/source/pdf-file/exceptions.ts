import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class PdfFileNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class PdfFileParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class PdfFileFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
