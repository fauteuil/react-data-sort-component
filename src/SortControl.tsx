import React from "react";

import { useSort, SortOption } from "./useSort";

import { SortComponentWrapper } from "./styles";

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
export function SortControl<T>(props: SortControlProps<T>) {
  const { sortOptions } = props;

  // Pass props to the custom sort hook to get sort functionality.
  const {
    handleDirectionToggle,
    handleSortKeyChange,
    sortDirection,
    sortKey
  } = useSort(props);

  function renderSortOptions({ label, value }: SortOption<T>, index: number) {
    const optionTitle = `Sort by ${label} (${value})`;
    return (
      <option
        key={index}
        label={`${label}`}
        title={optionTitle}
        value={value.toString()}
      />
    );
  }

  function renderSortOptionSelect() {
    return sortOptions?.length ? (
      <select onChange={handleSortKeyChange}>
        {sortOptions.map(renderSortOptions)}
      </select>
    ) : (
      <span>(No sort options were found)</span>
    );
  }

  function renderSortDirectionIcon() {
    const directionIcon = sortDirection === "asc" ? "v" : "^";
    const buttonTitle =
      sortDirection === "asc"
        ? `Sort by ${sortKey} in Descending order`
        : `Sort by ${sortKey} in Ascending order`;
    return (
      <button title={buttonTitle} onClick={handleDirectionToggle}>
        {directionIcon}
      </button>
    );
  }

  return (
    <>
      <SortComponentWrapper>
        <span>Sort by</span>
        {renderSortOptionSelect()}
        {renderSortDirectionIcon()}
      </SortComponentWrapper>
    </>
  );
}
