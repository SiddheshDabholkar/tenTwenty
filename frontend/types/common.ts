type Maybe<T> = T | null | undefined;
type MaybeArray<T> = T | T[];
type MaybeString<T> = Maybe<T | string>;

export type { Maybe, MaybeArray, MaybeString };
