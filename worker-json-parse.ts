// this web worker is used to parse json

import jsonData from "./src/assets/data/dummy-data.json";

self.onmessage = () => {
  console.log("Worker: parsing data");

  // importing json makes it an object so stringified again for demo purpose
  let stringifiedData = JSON.stringify(jsonData);

  // @ts-ignore
  self.postMessage(JSON.parse(stringifiedData));
};
