import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import { compareObjectsByKey } from "./utils";
import { SortDirection, ItemKey, SortOption } from "./types";

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

  // Create a copy before sorting, as the original array is frozen in strict mode.
  // `useMemo` prevents multiple re-renderings if the shallow-compared value
  // of `data` hasn't changed.
  const sortedData = useMemo(() => {
    return [...data];
  }, [data]);

  // Execute the sort and callback when local state
  // or supplied props have changed.
  useEffect(() => {
    if (sortedData?.length) {
      sortedData.sort(compareObjectsByKey(sortKey, sortDirection === "asc"));

      // Compare data before calling sort change handler.
      // TODO: this is imperfect performance-wise for arrays
      // of complex objects - flag sorting change by key/direction.
      const dataFlat = JSON.stringify(data);
      const sortedFlat = JSON.stringify(sortedData);

      if (dataFlat !== sortedFlat && onSortChange) {
        onSortChange(sortedData);
      }
    }
  }, [data, onSortChange, sortDirection, sortedData, sortKey]);

  /**
   * Handle changes to the sort key.
   * @param event: ChangeEvent<HTMLSelectElement>
   * TODO: generalize to allow other change event types.
   * TODO: expand to allow multiple, nested keys for multi-part sorting.
   */
  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortKey = event.target.value as ItemKey<T>;
    if (sortKey !== newSortKey) {
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
      setSortKey(newSortKey);
    }
  };

  /**
   * Handle changes to the sort direction.
   */
  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return {
    handleDirectionToggle,
    handleKeyChange,
    handleSortKeyChange,
    sortDirection,
    sortKey
  };
}
