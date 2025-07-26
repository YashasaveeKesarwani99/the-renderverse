// here we will use abort controller to cancel fetch requests
// to prevent memory leaks and unnecessary network usage ( handling race conditions ).

import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseAbortControllerProps {
  userId: number;
}

const UseAbortContoller: React.FC<UseAbortControllerProps> = ({ userId }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            signal,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: User = await response.json();
        setUserData(data);
      } catch (err) {
        if ((err as DOMException).name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError((err as Error).message);
        }
      }
    };
    fetchUserData();

    return () => {
      controller.abort(); // abort the fetch request on component unmount
    };
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return <div>Hello, {userData.name}</div>;
};

export default UseAbortContoller;

// the abort controller is used to cancel the fetch request if the component unmounts before the request completes, preventing memory leaks and unnecessary network usage. This is particularly useful in scenarios where the component may be unmounted while waiting for a response, such as in a list of items where each item fetches its own data.
// This approach is beneficial for performance and user experience, as it avoids unnecessary network requests and ensures that the application remains responsive even when dealing with multiple asynchronous operations.
// This pattern is especially useful in applications that require frequent data fetching, such as social media feeds, chat applications, or any scenario where components may be mounted and unmounted frequently based on user interactions
