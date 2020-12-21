import React from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Notes } from "./pages";
import { useResizeObserver } from "./hocs";

function App() {
  const [ref, size] = useResizeObserver();
  return (
    <div ref={ref} className="App">
      <Notes size={size} />
    </div>
  );
}

export default App;
