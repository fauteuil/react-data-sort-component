import { ChangeEvent, useEffect, useState } from "react";
import { compareObjectsByKey } from "./utils";

// Type declarations
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

export interface SortProps<T> {
  data: T[];
  onSortChange(data: T[]): void;
  sortOptions: any[];
}

export function useSort<T>({ data, onSortChange, sortOptions }: SortProps<T>) {
  // Local state
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const initialSortKey = sortOptions[0].value as ItemKey<T>;
  const [sortKey, setSortKey] = useState<ItemKey<T>>(initialSortKey);
  const [sortChanged, setSortChanged] = useState<boolean>(true);

  // Execute the sort and callback when local state
  // or supplied props have changed.
  useEffect(() => {
    // Create a copy before sorting, as the original array is frozen in strict mode.
    const sortedData = [...data];
    // Sort the data if the `sortChanged` flag has been set to true.
    if (sortChanged === true && sortedData?.length) {
      sortedData.sort(compareObjectsByKey(sortKey, sortDirection === "asc"));

      if (onSortChange) {
        onSortChange(sortedData);
      }

      // Reset the `sortChanged` flag.
      setSortChanged(false);
    }
  }, [data, onSortChange, sortChanged, sortDirection, sortKey]);

  /**
   * Handle changes to the sort key.
   * @param event: ChangeEvent<HTMLSelectElement>
   * TODO: generalize to allow other change evnt types.
   * TODO: expand to allow multiple, nseted keys for multi-part sorting.
   */
  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortKey = event.target.value as ItemKey<T>;
    if (sortKey !== newSortKey) {
      setSortChanged(true);
      setSortKey(newSortKey);
    }
  };

  /**
   * Handle directly passed options (e.g. from react-select).
   * @param option
   */
  const handleKeyChange = (selectedOption: SortOption<T> | null) => {
    const newSortKey = selectedOption?.value;
    if (newSortKey && sortKey !== newSortKey) {
      setSortChanged(true);
      setSortKey(newSortKey);
    }
  };

  /**
   * Handle changes to the sort direction.
   */
  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortChanged(true);
  };

  return {
    handleDirectionToggle,
    handleKeyChange,
    handleSortKeyChange,
    sortDirection,
    sortKey
  };
}
