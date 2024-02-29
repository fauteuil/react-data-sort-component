/**
 * First-order function that rearranges an indexed array of objects by the specified key,
 * extending functionality of `Array.sort()`.
 * based on a key of the object.
 * @param key the {keyof T} inddex of the object being sorted
 * @param ascending the {boolean} value specifying sort direction - Defaults to `true`
 * @type T - generic type - defaults to `Record<any, any>
 * @returns sorted array of {T} objects
 * @example
 *    myArrayOfObjects = [{id: 1, name:'Pam'},{id: 2, name:'Sue'},{id: 3, name:'Lucy'}]
 *    myArrayOfObjects.sort(compareObjectsByKey('name'))
 *    result: myArrayOfObjects = [{id: 3, name:'Lucy'},{id: 1, name:'Pam'},{id: 2, name:'Sue'}]
 */
export function compareObjectsByKey<T = Record<any, any>>(key: keyof T, ascending = true) {
  return function innerSort(objectA: T, objectB: T) {
    const sortValue = objectA[key] > objectB[key] ? 1 : objectA[key] < objectB[key] ? -1 : 0;
    return ascending ? sortValue : -1 * sortValue;
  };
}
