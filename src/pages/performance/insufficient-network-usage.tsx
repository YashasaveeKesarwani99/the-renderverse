// Here we'll see how to handle network calls when the data we're going to get is too big.
// some of the methods we'll use are:
// 1. suspense the component until the data is fetched
// 2. auto fetching in the background
// 3. lazy loading the component ( rendering only when it is in the view )

import { Suspense, useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// parent component
const InsufficientNetworkUsage = () => {
  return (
    <div>
      <TopContent />

      <Suspense fallback={<div>Loading more...</div>}>
        <DeferredContent />
      </Suspense>

      <LazySection />
    </div>
  );
};

// top content, which comes into view first - Immediate fetch (above-the-fold) with background refetching
const TopContent = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["top"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10").then(
        (res) => res.json()
      ),
    staleTime: 1000 * 60 * 2, // data is fresh for 2 minutes
    refetchInterval: 1000 * 60, // refetch every 30 seconds,
    refetchOnWindowFocus: true, // refetch when window is focused
  });

  if (isLoading) return <div>Loading top content...</div>;

  return (
    <div>
      <h2>Top Content</h2>
      {data.map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
      {isFetching && <div>Updating...</div>}
    </div>
  );
};

// deferred content - Suspense enabled, non-critical data
const DeferredContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["deferred"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=20").then(
        (res) => res.json()
      ),
    // @ts-ignore
    suspense: true, // enable suspense
  });

  if (isLoading) return <div>Loading deferred content...</div>;

  return (
    <div>
      <h2>Deferred Content</h2>
      {(data as any).map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

// lazy section - lazy load via intersection observer
const LazySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetch("/api/stats").then((res) => res.json()),
    enabled: visible,
    staleTime: 1000 * 60,
    refetchInterval: visible ? 1000 * 45 : false, // refetch every 45s only when visible
  });

  return (
    <div ref={ref}>
      {visible ? (
        <div>{isFetching ? "Loading Stats..." : `Views: ${data?.views}`}</div>
      ) : (
        <div>Scroll to load stats...</div>
      )}
    </div>
  );
};

export default InsufficientNetworkUsage;
