export type ListItem = { name: string; age: number; country: string };

export type SortDirection = "asc" | "desc";

export type ItemKey<T> = keyof T;

/**
 * Mapped type to convert a supplied generic list item type `T`
 * a label / value pair for use in a select control.
 */
export type SortOption<T> = {
  label: T[ItemKey<T>];
  value: ItemKey<T>;
};
