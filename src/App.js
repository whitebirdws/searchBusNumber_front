import Main from "./component/Main";
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
