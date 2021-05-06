import React, { useState } from "react";

import { ListItem } from "./types";
import { getInitialList } from "./data";
import { SortControl } from "./SortControl";

import {
  ListItemDataLabel,
  ListItemDataWrapper,
  ListItemWrapper,
  ListWrapper
} from "./styles";

const listSortOptions = [
  { label: "Name", value: "name" },
  { label: "Age", value: "age" },
  { label: "Country", value: "country" }
];

function renderHeader() {
  return (
    <ListItemWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>{"name"}</ListItemDataLabel>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>{"age"}</ListItemDataLabel>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>{"country"}</ListItemDataLabel>
      </ListItemDataWrapper>
    </ListItemWrapper>
  );
}

function renderListItem({ name, age, country }: ListItem, index: number) {
  return (
    <ListItemWrapper key={index}>
      <ListItemDataWrapper>
        <span>{name}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <span>{age}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <span>{country}</span>
      </ListItemDataWrapper>
    </ListItemWrapper>
  );
}

export interface SortableListProps {
  data: ListItem[];
}

export function SortableList({ data }: SortableListProps) {
  const [list, setList] = useState(getInitialList());

  /**
   * Callback for the SortControl to update state and restart component rendering.
   * @param data: ListItem[]
   */
  function handleSortChange(data: ListItem[]) {
    setList(data);
  }

  return (
    <>
      <div>A Sortable List</div>
      <SortControl<ListItem>
        data={list}
        onSortChange={handleSortChange}
        sortOptions={listSortOptions}
      />

      {renderHeader()}

      <ListWrapper>{list.map(renderListItem)}</ListWrapper>
    </>
  );
}
