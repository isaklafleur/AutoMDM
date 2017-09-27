/* // Callback
function http(url, method, successCallback, errorHandler) {
  setTimeout(() => {
    let data = "the answer";
    if (data) {
      successCallback(data);
    } else {
      errorHandler("No data");
    }
  }, 1000);
}

http(
  "http://www.google.com",
  "GET",
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
); */

// Promises
function http(url, method) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = "Hello from Google!";
      if (data) {
        resolve(data);
      } else {
        reject("No data");
      }
    }, 1000);
  });
  return promise;
}

http("http://www.google.com", "GET")
  .then(data => {
    return data.toUpperCase();
  })
  .then(modifiedData => {
    console.log(modifiedData);
    return modifiedData;
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
