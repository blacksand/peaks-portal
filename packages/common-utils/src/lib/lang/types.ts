export type Nullable<T> = T | null
export type Undefinable<T> = T | undefined

export type Maybe<T> = T | null | undefined

export type IsStartsWith<
  T extends string,
  S extends string,
> = S extends `${T}${string}` ? true : false
