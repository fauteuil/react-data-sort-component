import React, { useState } from "react";
import styled from "styled-components";
import faker from "faker";

import { SortControl } from "./SortControl";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid black;
  border-radius: 0.0625rem;
  max-height: 40rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 0.0625rem solid black;
  border-radius: 0.0625rem;
`;

const ListItemDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-left: 0.0625rem solid gray;
  min-width: 12rem;
`;

const ListItemDataLabel = styled.span`
  padding-right: 0.5rem;
`;

type ListItem = { name: string; age: number; country: string };

function getInitialList(): ListItem[] {
  const list = [];
  for (let i = 0; i < 25; i++) {
    list.push({
      name: faker.name.findName(),
      age: faker.datatype.number(99),
      country: faker.address.country()
    });
  }
  return list;
}

function renderListItem({ name, age, country }: ListItem) {
  return (
    <ListItemWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>name: </ListItemDataLabel>
        <span>{name}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>age: </ListItemDataLabel>
        <span>{age}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <ListItemDataLabel>country:</ListItemDataLabel>
        <span>{country}</span>
      </ListItemDataWrapper>
    </ListItemWrapper>
  );
}

export interface ListProps {}

export function SortableList() {
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
      <SortControl data={list} onSortChange={handleSortChange} />
      <ListWrapper>{list.map(renderListItem)}</ListWrapper>
    </>
  );
}
