import logo from "./logo.svg";
import "./App.css";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
