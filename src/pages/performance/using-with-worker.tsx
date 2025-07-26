import { useEffect, useState } from "react";

export function UsingWithWorker() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("../../../worker.ts", import.meta.url), {
      type: "module",
    });

    worker.postMessage("start");
    worker.onmessage = (e) => {
      setResult(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, []);

  return <div>Worker Result: {result?.toFixed(2) || "Calculating..."}</div>;
}
