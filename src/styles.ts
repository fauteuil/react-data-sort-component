import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid black;
  border-radius: 0.0625rem;
  max-height: 40rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 0.0625rem solid black;
  border-radius: 0.0625rem;
`;

export const ListItemDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-left: 0.0625rem solid gray;
  min-width: 12rem;
`;

export const ListItemDataLabel = styled.span`
  padding-right: 0.5rem;
`;

export const SortComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  button {
    border: 0.0625rem solid black;
    border-radius: 0.125rem;
    padding: 0 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }

  select {
    padding: 0.25rem;
  }

  span {
    padding: 0.25rem;
  }
`;

export const SelectWrapper = styled.div`
  padding: 0 1rem;
  width: 11rem;
`;
