import { IReducer } from "../reducer.interface";
import { IdCollection, TextToIdCollectionParameters } from "./types";

export interface ITextToIdCollectionReducer extends IReducer<IdCollection, TextToIdCollectionParameters> {}
