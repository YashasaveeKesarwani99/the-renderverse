// how to stop heavy computing everytime the component re-renders
import { useMemo, useState, memo } from "react";

const MemoComponent = memo(() => {
  const heavyComputing = useMemo(() => {
    console.log("this piece of code has heavy computation");

    let total = 0;
    for (let i = 0; i < 1_000_000_000; i++) {
      total += Math.sqrt(i % 10);
    }
    return total;
  }, []);

  return <>{heavyComputing}</>;
});

function UsingMemo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Parent Component</div>
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
      <div>{count}</div>
      <MemoComponent />
    </>
  );
}

export default UsingMemo;

// what's happening here is the combination of memo and useMemo is
// preventing the re-render delays, how?
// 1. memo prevents the child component to re-render unnecessarily
// 2. useMemo memoizes the heavy computing part
