import logo from './logo.svg';
import './App.css';

function App() {
  var origin = '23.7248,75.9921'
  var destination = '23.7185370,76.0004910'
  fetch(`http://localhost:3001/maps/${origin}/${destination}`)
  .then(res => res.text())
  .then(console.log)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        BOILERPLATE
      </header>
    </div>
  );
}

export default App;
