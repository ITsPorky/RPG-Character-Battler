import BattleScreen from "./components/battleScreen.jsx";
import CharacterSheet from "./components/characterSheet.jsx";
import styled from "styled-components";
import Battle from "./components/battle.jsx";
import "./App.css";

function App() {
  return (
    <AppBody className="App">
      {/* <BattleScreen /> */}
      <Battle />
      <CharacterSheet />
    </AppBody>
  );
}

const AppBody = styled.div`
  display: block;
  margin: auto;
  width: 100%;
  max-width: 1200px;
`;

export default App;
