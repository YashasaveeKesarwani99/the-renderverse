// showcasing react use.

import { Suspense, use } from "react";

function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from React use!");
    }, 1000);
  });
}

const dataPromise = fetchData();

const UsingReactUse = () => {
  const data = use(dataPromise);
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Using React use</h2>
      <p>{data}</p>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsingReactUse />
    </Suspense>
  );
}
