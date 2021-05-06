import React, { useState } from "react";
import styled from "styled-components";

const SortComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortIconWrapper = styled.div`
  border: 0.0625rem solid black;
  border-radius: 0.125rem;
`;

export interface SortSelectProps {
  data: any[];
  handleSortDirectionChange(): void;
  handleSortKeyChange(): void;
  sortOptions: { label: string; value: string }[];
}

export function SortSelect({
  data,
  handleSortDirectionChange,
  handleSortKeyChange,
  sortOptions
}: SortSelectProps) {
  // Local state
  const [sortDirection, setSortDirection] = useState();
  const [sortKey, setSortKey] = useState();

  // Change handlers
  const handleSelectChange = () => {
    if (handleSortKeyChange) {
      handleSortKeyChange();
    }
  };
  const handleDirectionToggle = () => {
    if (handleSortDirectionChange) {
      handleSortDirectionChange();
    }
  };

  function getSortDirectionIcon() {}

  return (
    <>
      <div>Sort by</div>
      <SortComponentWrapper>
        {sortOptions?.length ? (
          <select onChange={handleSelectChange}>
            {sortOptions.map(({ label, value }) => (
              <option label={label} value={value} />
            ))}
          </select>
        ) : (
          <SortIconWrapper>No Sort options were found</SortIconWrapper>
        )}
        <SortIconWrapper>{getSortDirectionIcon()}</SortIconWrapper>
      </SortComponentWrapper>
    </>
  );
}
