export interface IReducer<T, P> {
	reduce(payload: P): T;
}
