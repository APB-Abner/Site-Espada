import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Scene from "./components/Scene";
import Story from "./components/Book";
import Legandary from "./components/legendadary";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/legendadary" element={<Legandary />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  );
}
