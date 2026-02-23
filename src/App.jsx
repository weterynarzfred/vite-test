import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Article from "./pages/Article";

function About() {
  return <div>
    <h1>About</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laborum cum sunt nam repellat quos delectus voluptate commodi minus, incidunt ex necessitatibus voluptates maxime nisi, nostrum consectetur a beatae ipsum.</p>
  </div>;
}

function App() {

  return <div id="App">
    <div className="content content--slim">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles/*" element={<Article />} />
      </Routes>
    </div>
  </div>;
}

export default App;
