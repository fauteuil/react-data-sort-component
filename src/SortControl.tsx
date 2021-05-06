import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { compareObjectsByKey } from "./utils";

const SortComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortIconWrapper = styled.div`
  border: 0.0625rem solid black;
  border-radius: 0.125rem;
`;

export type SortDirection = "asc" | "desc";

export type SortOption<T> = { label: string; value: keyof T };

export interface SortControlProps<T> {
  data: T[];
  onSortChange(data: T[]): void;
  sortOptions: SortOption<T>[];
}

/**
 * Sorts the supplied data with types provided
 * according to the given `sortOptions`.
 * `T` - data type
 * `S` - sort option type
 * @param param0 props: SortControlProps
 */
export function SortControl<T>({
  // export function SortControl<T,S>({
  data,
  onSortChange,
  sortOptions
}: SortControlProps<T>) {
  // Local state
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const initialSortKey = sortOptions[0].value;
  const [sortKey, setSortKey] = useState<keyof T>(initialSortKey);

  // execute the sort and callback when local state has changed.
  useEffect(() => {
    // Update data
    data.sort(compareObjectsByKey(sortKey, sortDirection === "asc"));

    // Execute callback
    if (onSortChange) {
      onSortChange([...data]);
    }
  }, [data, onSortChange, sortDirection, sortKey]);

  // Change handlers
  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortKey(event.target.value as keyof T);
    // Update data
    // data.sort(compareObjectsByKey<T>(sortKey, sortDirection === "asc"));

    // // Execute callback
    // if (onSortChange) {
    //   onSortChange([...data]);
    // }
  };
  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");

    // Update data
    // data.sort(compareObjectsByKey<T>(sortKey, sortDirection === "asc"));

    // // Execute callback
    // if (onSortChange) {
    //   onSortChange([...data]);
    // }
  };

  function getSortDirectionIcon() {}

  return (
    <>
      <div>Sort by</div>
      <SortComponentWrapper>
        {sortOptions?.length ? (
          <select onChange={handleSortKeyChange}>
            {sortOptions.map(({ label, value }) => (
              <option label={`${label} (${value})`} value={value.toString()} />
            ))}
          </select>
        ) : (
          <SortIconWrapper>(No Sort options were found)</SortIconWrapper>
        )}
        <SortIconWrapper>{getSortDirectionIcon()}</SortIconWrapper>
      </SortComponentWrapper>
    </>
  );
}
