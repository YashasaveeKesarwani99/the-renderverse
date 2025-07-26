// here we see how to stop dom thrashing by using requestAnimationFrame and useLayoutEffect

import React, { useRef, useLayoutEffect, useState } from "react";

const DoNotThrashDom: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(100); // base height

  useLayoutEffect(() => {
    if (!boxRef.current) return;

    const measuredHeight = boxRef.current.offsetHeight;

    if (measuredHeight > 100) {
      // Delay state update until next animation frame
      requestAnimationFrame(() => {
        setHeight(measuredHeight + 20);
      });
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        height,
        background: "#e0f7fa",
        padding: "12px",
        transition: "height 0.3s ease",
        overflow: "hidden",
        borderRadius: "8px",
        color: "#00796b",
      }}
    >
      <p>
        This is some variable content inside the box. Resize your content or
        font size to see the height adjust.
      </p>
    </div>
  );
};

export default DoNotThrashDom;

// In this example, we use useLayoutEffect to measure the height of a box after it has been rendered.
// If the height exceeds a certain threshold, we use requestAnimationFrame to update the state,
// which prevents DOM thrashing by ensuring that the state update happens in the next animation frame.
// This approach helps to avoid layout thrashing, which can occur when multiple DOM measurements and updates
// are made in quick succession, leading to performance issues and janky animations.
// This pattern is particularly useful when dealing with dynamic content that may change the layout of the page
// and requires careful management of state updates to maintain smooth rendering.
