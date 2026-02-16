import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Message from "./pages/Message";
import Navbar from "./components/Navbar";
import BirthdayCountdown from "./components/BirthdayCountdown";

function App() {
  return (
    <BirthdayCountdown>
      <BrowserRouter basename="/birthday-site">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </BirthdayCountdown>
  );
}

export default App;
