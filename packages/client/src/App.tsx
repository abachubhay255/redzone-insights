import { Shell } from "./navigation/Shell";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <Shell />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;
