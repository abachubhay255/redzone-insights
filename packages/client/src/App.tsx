import "./App.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { Home } from "./Home";

function App() {
  return (
    <ReactQueryProvider>
      <Home />
    </ReactQueryProvider>
  );
}

export default App;
