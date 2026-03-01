import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import BirthdayCountdown from "./components/BirthdayCountdown";

// 🔥 Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Memories = lazy(() => import("./pages/Memories"));
const Message = lazy(() => import("./pages/Message"));
const Timeline = lazy(() => import("./pages/Timeline"));

function App() {
  return (
    <BirthdayCountdown>
      <BrowserRouter>
        <Navbar />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
              <div className="text-pink-500 text-lg animate-pulse">
                Loading something special... 💕
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/message" element={<Message />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </BirthdayCountdown>
  );
}

export default App;