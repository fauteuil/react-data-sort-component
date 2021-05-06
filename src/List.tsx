import React, { useState } from "react";
import styled from "styled-components";
import faker from "faker";

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
        <span>name:</span>
        <span>{name}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <span>age:</span>
        <span>{age}</span>
      </ListItemDataWrapper>
      <ListItemDataWrapper>
        <span>country:</span>
        <span>{country}</span>
      </ListItemDataWrapper>
    </ListItemWrapper>
  );
}

export interface ListProps {}

export function List() {
  const [list, setList] = useState(getInitialList());

  return (
    <>
      <div>A Sortable List</div>
      <ListWrapper>{list.map(renderListItem)}</ListWrapper>
    </>
  );
}
