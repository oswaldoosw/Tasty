import Pages from "./pages/Pages";

import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";

import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
          <Pages />
      </BrowserRouter>
    </div>
  );
}


const Content = styled.div`
  margin: 0% 20%; 
`;

export default App;
