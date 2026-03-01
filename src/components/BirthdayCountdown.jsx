import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayCountdown({ children }) {
  const targetDate = new Date("2026-03-01T11:29:00+05:30");

  const [currentTime, setCurrentTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealing, setRevealing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const bypass =
    window.location.search.includes("bypass=true") ||
    localStorage.getItem("bypassCountdown") === "true";

  const alreadyRevealed =
    localStorage.getItem("birthdayRevealed") === "true";

  // Fetch IST time
  useEffect(() => {
    fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(new Date(data.dateTime));
        setLoading(false);
      })
      .catch(() => {
        setCurrentTime(new Date());
        setLoading(false);
      });
  }, []);

  // Tick
  useEffect(() => {
    if (!currentTime) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime]);

// Calculate
  useEffect(() => {
    if (!currentTime) return;

    const diff = targetDate - currentTime;

    if (diff <= 0) {
      // If already revealed before → unlock instantly
      if (alreadyRevealed || bypass) {
        setUnlocked(true);
        return;
      }

      if (!revealing) {
        setRevealing(true);

        setTimeout(() => {
          localStorage.setItem("birthdayRevealed", "true");
          setUnlocked(true);
        }, 4500);
      }

      return;
    }

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  }, [currentTime]);

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Preparing your surprise…
      </div>
    );
  }

  if (unlocked || bypass) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {revealing ? (
        <motion.div
          key="romantic"
          className="h-screen w-full bg-black text-white flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          {/* Soft Pink Glow */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 8 }}
            transition={{ duration: 3 }}
            className="absolute w-40 h-40 rounded-full bg-pink-500 opacity-20 blur-3xl"
          />

          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -200, opacity: [0, 1, 0] }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
              }}
              className="absolute text-pink-400 text-2xl"
              style={{
                left: `${10 + i * 10}%`,
                bottom: "0%",
              }}
            >
              ❤️
            </motion.div>
          ))}

          {/* Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="text-3xl md:text-5xl font-light tracking-wide z-10"
          >
            The surprise is here…
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-lg text-pink-300 z-10"
          >
            Happy Birthday ❤️
          </motion.p>
        </motion.div>
      ) : (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl mb-8 font-light">
            Something special unlocks soon…
          </h1>

          <div className="flex gap-6 md:gap-8 text-4xl md:text-6xl font-bold">
            {timeLeft &&
              ["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit}>
                  {timeLeft[unit]}
                  <p className="text-xs md:text-sm mt-2 capitalize font-light">
                    {unit}
                  </p>
                </div>
              ))}
          </div>

          <p className="mt-10 text-gray-400 text-sm">
            Countdown to March 2 ❤️
          </p>
        </div>
      )}
    </AnimatePresence>
  );
}