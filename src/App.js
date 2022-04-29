import axios from "axios";
import Main from "./component/Main";
import BusNumberArrContext from "./store/BusNumberArrContext";
import { BusNumberProvider } from "./store/BusNumberArrContext";
function App() {
  return (
    <>
      <BusNumberProvider>
        <div>
          <Main />
        </div>
      </BusNumberProvider>
    </>
  );
}

export default App;
