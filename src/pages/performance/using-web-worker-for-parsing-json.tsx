import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
};

export function UsingWebWorkerForParsingJson() {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const worker = new Worker(
      new URL("../../../worker-json-parse", import.meta.url),
      {
        type: "module",
      }
    );

    worker.postMessage("start");
    worker.onmessage = (e: MessageEvent<any>) => {
      setData(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, []);

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>User Data</h2>
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.active ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
