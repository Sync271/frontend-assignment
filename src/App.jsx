import { useLayoutEffect, useState } from "react";
import TableComponent from "./components/Table";

function App() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );

      setData(await res.json());
    })();
  }, []);

  return <TableComponent data={data} />;
}

export default App;
