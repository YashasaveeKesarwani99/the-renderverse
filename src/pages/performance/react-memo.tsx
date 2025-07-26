// how to stop re-rendering children components if the parent re-renders
import React, { useState } from "react";

const HeavyChild = React.memo(() => {
  console.log("I'm the heavy chilld!");

  return <>heavy child</>;
});

function ReactMemo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>increment</button>
      <div>{count}</div>
      <HeavyChild />
    </>
  );
}

export default ReactMemo;

// In the above example, we memoized the child component so that it re-renders only when props or the states
// belonging to the child component changes
