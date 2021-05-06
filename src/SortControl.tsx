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
  padding: 0 0.5rem;
  margin-left: 0.5rem;
`;

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

export interface SortControlProps<T> {
  data: T[];
  onSortChange(data: T[]): void;
  sortOptions: any[];
}

/**
 * Sorts the supplied data with types provided
 * according to the given `sortOptions`.
 * `T` - data type
 * @param param0 props: SortControlProps
 */
export function SortControl<T>({
  data,
  onSortChange,
  sortOptions
}: SortControlProps<T>) {
  // Local state
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const initialSortKey = sortOptions[0].value as ItemKey<T>;
  const [sortKey, setSortKey] = useState<ItemKey<T>>(initialSortKey);
  const [sortChanged, setSortChanged] = useState<boolean>(true);

  // Execute the sort and callback when local state has changed.
  useEffect(() => {
    // Update data
    data.sort(compareObjectsByKey(sortKey, sortDirection === "asc"));

    // Execute callback when the change flag has been set to true
    if (sortChanged === true && onSortChange) {
      onSortChange([...data]);
      setSortChanged(false);
    }
  }, [data, onSortChange, sortChanged, sortDirection, sortKey]);

  // Change handlers
  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortKey = event.target.value as ItemKey<T>;
    if (sortKey !== newSortKey) {
      setSortChanged(true);
      setSortKey(newSortKey);
    }
  };

  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortChanged(true);
  };

  function getSortDirectionIcon() {
    const directionIcon = sortDirection === "asc" ? "v" : "^";
    return <span onClick={handleDirectionToggle}>{directionIcon}</span>;
  }

  function renderSortOptions({ label, value }: SortOption<T>, index: number) {
    return (
      <option
        key={index}
        label={`${label} (${value})`}
        value={value.toString()}
      />
    );
  }

  return (
    <>
      <div>Sort by</div>
      <SortComponentWrapper>
        {sortOptions?.length ? (
          <select onChange={handleSortKeyChange}>
            {sortOptions.map(renderSortOptions)}
          </select>
        ) : (
          <SortIconWrapper>(No Sort options were found)</SortIconWrapper>
        )}
        <SortIconWrapper>{getSortDirectionIcon()}</SortIconWrapper>
      </SortComponentWrapper>
    </>
  );
}
