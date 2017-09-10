function createCluster(arrayOfParts) {
  let clusterArray = [];
  for (var i = arrayOfParts.length - 1; i >= 58192; i--) {
    let cluster = [];
    for (var j = arrayOfParts.length - 1; j >= 0; j--) {
      if (fuzzball.token_sort_ratio(arrayOfParts[i], arrayOfParts[j]) > "80") {
        console.log("arrayOfParts[j]: ", arrayOfParts[j]);
        cluster.push(arrayOfParts[j]);
        // console.log("arrayOfParts.splice(j, 1): ", arrayOfParts.splice(j, 1));
        arrayOfParts.splice(j, 1);
      }
    }
    let obj = {};
    obj[arrayOfParts[i]] = cluster.sort();
    // console.log("obj", obj);
    clusterArray.push(obj);
  }
  console.log("clusterArray", JSON.stringify(clusterArray, null, 2));
  console.log("clusterArray.length", clusterArray.length);
}
