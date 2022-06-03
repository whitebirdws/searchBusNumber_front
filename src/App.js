import Main from "./component/Main";
import React, { useState, useEffect } from "react";
import { BusNumberProvider } from "./store/BusNumberArrContext";

import Spinner from "./component/Spinner";
function App() {
  const [view, setView] = useState(false);
  useEffect(() => {
    setView(true);
  }, []);
  return (
    <>
      <BusNumberProvider>
        {view === true ? (
          <div>
            <Main />
          </div>
        ) : (
          <Spinner />
        )}
      </BusNumberProvider>
    </>
  );
}

export default App;
