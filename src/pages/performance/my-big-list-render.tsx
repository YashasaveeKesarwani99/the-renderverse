// here we try to keep the number of dom nodes less by virtualizing nodes.

import React from "react";
import { FixedSizeList } from "react-window";
import type { ListChildComponentProps } from "react-window";

// Define the props for the list component
interface MyBigListProps {
  items: string[];
  height?: number;
  width?: number | string;
  itemHeight?: number;
}

// Define the type-safe item renderer
const Row: React.FC<ListChildComponentProps> = React.memo(
  ({ index, style, data }) => {
    const item = data[index];
    return (
      <div
        style={{
          ...style,
          padding: "8px 12px",
        }}
      >
        {item}
      </div>
    );
  }
);

const MyBigList: React.FC<MyBigListProps> = React.memo(
  ({ items, height = 400, width = "100%", itemHeight = 40 }) => {
    return (
      <FixedSizeList
        height={height}
        width={width}
        itemCount={items.length}
        itemSize={itemHeight}
        itemData={items}
      >
        {Row}
      </FixedSizeList>
    );
  }
);

const MyBigListRender: React.FC = () => {
  const bigArray = React.useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => `Item #${i + 1}`);
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Virtualized List Example</h2>
      <MyBigList items={bigArray} />
    </div>
  );
};

export default MyBigListRender;

// here we use react-window to render a large list efficiently
// by only rendering the visible items in the viewport, which improves performance
// and reduces the number of DOM nodes created, making it suitable for large datasets.
// This approach is particularly useful for applications that need to display large lists or tables without causing performance issues.
