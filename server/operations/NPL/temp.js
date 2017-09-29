// Return a sorted object by its values
function uniqueCountSorted(uniqueCountObject) {
  const sortedObj = Object.keys(uniqueCountObject)
    .sort((a, b) => uniqueCountObject[a] - uniqueCountObject[b])
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: uniqueCountObject[key],
      }),
      {},
    );
  return sortedObj;
}
