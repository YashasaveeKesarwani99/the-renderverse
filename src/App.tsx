import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import ReactMemo from "./pages/performance/react-memo";
import UsingMemo from "./pages/performance/using-memo";
import UsingCallback from "./pages/performance/using-callback";
import { UsingRequestIdleCallback } from "./pages/performance/using-request-idle-callback";
import { UsingWebWorkerForParsingJson } from "./pages/performance/using-web-worker-for-parsing-json";
import { UsingWithWorker } from "./pages/performance/using-with-worker";
import MyBigListRender from "./pages/performance/my-big-list-render";
import DoNotThrashDom from "./pages/performance/do-not-thrash-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/react-memo" element={<ReactMemo />} />
      <Route path="/using-memo" element={<UsingMemo />} />
      <Route path="/using-callback" element={<UsingCallback />} />
      <Route
        path="/using-request-idle-callback"
        element={<UsingRequestIdleCallback />}
      />
      <Route path="/using-with-worker" element={<UsingWithWorker />} />
      <Route
        path="/using-web-worker-for-parsing-json"
        element={<UsingWebWorkerForParsingJson />}
      />
      <Route path="/my-big-list-render" element={<MyBigListRender />} />
      <Route path="/do-not-thrash-dom" element={<DoNotThrashDom />} />
    </Routes>
  );
}

export default App;
