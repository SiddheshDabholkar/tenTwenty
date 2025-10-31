import { englishMessage } from "@/lang/en";

type Maybe<T> = T | null | undefined;
type MaybeArray<T> = [] | T[];
type MaybeString<T> = Maybe<T | string>;

type TranslateKey = keyof typeof englishMessage;

export type { Maybe, MaybeArray, MaybeString, TranslateKey };
