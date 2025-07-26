// here we are using requestIdleCallback to defer this heavy computation while rendering component

import { useEffect, useState } from "react";

export function UsingRequestIdleCallback() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const id = requestIdleCallback(() => {
      // does heavy work in the background
      console.log("Computing with requestIdleCallback");
      let total = 0;
      for (let i = 0; i < 100_000_000; i++) {
        total += Math.sqrt(i % 10);
      }
      setResult(total);
    });

    return () => cancelIdleCallback(id); // cancelling the subscription
  }, []);

  return <div>Idle Result: {result?.toFixed(2) || "Calculating..."}</div>;
}
