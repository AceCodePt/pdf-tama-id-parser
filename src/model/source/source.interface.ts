// Typescript currently unable to condition the never type directly so there is a work around
export type ISource<T, P = never> = [P] extends [never] ? ISourceWithoutParams<T> : ISourceWithParams<T, P>;

interface ISourceWithoutParams<T> {
	ask(): T;
}

interface ISourceWithParams<T, P> {
	ask(payload: P): T;
}
