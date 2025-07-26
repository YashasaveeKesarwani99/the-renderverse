// this worker is used for offloading heavy computation to webWorkers

self.onmessage = () => {
  console.log("Worker: starting computation");

  let total = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    total += Math.sqrt(i % 10);
  }

  // @ts-ignore
  self.postMessage(total);
};
