export type Nullable<T> = T | null
export type Undefinable<T> = T | undefined

export type Perhaps<T> = T | null | undefined

export type IsStartsWith<
  T extends string,
  S extends string,
> = S extends `${T}${string}` ? true : false
