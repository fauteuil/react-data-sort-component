import React, { useState } from "react";

import { ListItem } from "./types";
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

function renderList(list: ListItem[]) {
  return <ListWrapper>{list.map(renderListItem)}</ListWrapper>;
}

export interface SortableListProps {
  data: ListItem[];
}

export function SortableList({ data }: SortableListProps) {
  const [list, setList] = useState(data);

  /**
   * Callback for the SortControl to update state and restart component rendering.
   * @param data: ListItem[]
   */
  function handleSortChange(data: ListItem[]) {
    setList(data);
  }

  return (
    <>
      <SortControl<ListItem>
        data={list}
        onSortChange={handleSortChange}
        sortOptions={listSortOptions}
      />
      {renderHeader()}
      {renderList(list)}
    </>
  );
}
