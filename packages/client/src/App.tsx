import AppRouter from "./AppRouter";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./App.module.css";

function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
