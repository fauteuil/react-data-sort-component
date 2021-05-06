import React from "react";
import { SortableList } from "./SortableList";
import { getInitialList } from "./data";

export default function App() {
  return (
    <div className="App">
      <SortableList data={getInitialList()} />
    </div>
  );
}
