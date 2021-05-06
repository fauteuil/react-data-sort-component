import faker from "faker";
import { ListItem } from "./types";

export function getInitialList(): ListItem[] {
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
