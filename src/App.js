import Pages from "./pages/Pages";
import Group from "./components/Group";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "./components/SearchBar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar />
        <Group />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
