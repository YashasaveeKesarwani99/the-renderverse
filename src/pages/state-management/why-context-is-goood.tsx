// Here we'll see how to use React Context effectively to avoid unnecessary re-renders.

import React, { createContext, useState, useContext, memo } from "react";

// Create a context with number type
const MyContext = createContext<number>(0);

const Child: React.FC = () => {
  const value = useContext(MyContext);
  console.log("Child re-rendered");
  return <div>Child using context value: {value}</div>;
};

// Middle component that does NOT consume context
const Middle: React.FC = memo(() => {
  console.log("Middle re-rendered");
  return <Child />;
});

// Parent component that does NOT consume context
const Parent: React.FC = memo(() => {
  console.log("Parent re-rendered");
  return <Middle />;
});

const WhyContextIsGoood: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <MyContext.Provider value={count}>
      <Parent />
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </MyContext.Provider>
  );
};

export default WhyContextIsGoood;

// In this example, the Parent and Middle components are memoized to prevent unnecessary re-renders.
// The Child component consumes the context value, and it will only re-render when the context value changes.
// The Parent and Middle components will not re-render when the button is clicked, as they do
