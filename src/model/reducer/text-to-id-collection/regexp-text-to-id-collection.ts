import { ITextToIdCollectionReducer } from "./text-to-id-collection.interface";
import { TextToIdCollectionParameters, IdCollection } from "./types";

export class RegexpTextToIdCollection implements ITextToIdCollectionReducer {
	reduce({ text }: TextToIdCollectionParameters): IdCollection {
		const ids: Set<string> = new Set();
		for (let line of text.split("\n")) {
			const numbers = /\d{9}(?=ת\.ז)/g.exec(line) ?? [];
			if (numbers.length >= 1) {
				numbers.forEach((value) => ids.add(value));
			}
		}

		return [...ids];
	}
}
