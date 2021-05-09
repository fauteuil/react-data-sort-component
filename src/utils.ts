/**
 * Generic typed comparison fn for use with `Array.sort`
 * This is passed as the comparison function with
 * the following syntax:
 * MyArray.sort(compareObjectsByKey<MyObjectType>('myObjectKey', true/false)`
 * @type T
 * @param key: keyof T
 * @param ascending: boolean
 */
export function compareObjectsByKey<T>(key: keyof T, ascending = true) {
  return function innerSort(objectA: T, objectB: T) {
    const sortValue =
      objectA[key] > objectB[key] ? 1 : objectA[key] < objectB[key] ? -1 : 0;
    return ascending ? sortValue : -1 * sortValue;
  };
}
