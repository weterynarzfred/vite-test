import { Link } from "react-router-dom";

export default function Nav() {
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/articles/intro">Intro</Link>
    <Link to="/articles/o/o">Oooo</Link>
  </nav>;
}
