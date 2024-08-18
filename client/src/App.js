import logo from "./logo.svg";
import "./App.css";

import Welcome from "./components/Welcome";

function App() {
  const initialRequest = async () => {
    try {
      const res = await fetch("http://localhost:4000/");
      const data = await res.text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  initialRequest();

  return (
    <div className="App">
      <Welcome></Welcome>
    </div>
  );
}

export default App;
