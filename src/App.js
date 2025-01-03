import "./App.css";
import { SoundProvider } from "./context/SoundContext";
import Home from "./home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SoundProvider>
  );
}

export default App;
