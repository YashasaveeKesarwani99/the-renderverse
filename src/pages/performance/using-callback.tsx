// how to stop re-rendering children components if the parent re-renders - using useCallback
import React, { useCallback, useState } from "react";

const HeavyChild = React.memo(
  ({ clickHandler }: { clickHandler: () => void }) => {
    console.log("I get re-rendered if not used useCallback!");

    return <button onClick={clickHandler}>click me!</button>;
  }
);

function UsingCallback() {
  const [count, setCount] = useState(0);

  const clickHandler = useCallback(() => console.log("clicked!"), []);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>increment</button>
      <div>{count}</div>
      <HeavyChild clickHandler={clickHandler} />
    </>
  );
}

export default UsingCallback;

// In the above example if we would have not used useCallback then
// even though we have memoized child component it would have re-rendered
// because every time the parent component re-renders it creates
// new functions that included, so to stop that we can memoize the function
// so that it is not created on every render.
