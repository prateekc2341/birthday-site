import { useEffect, useState } from "react";

export default function BirthdayCountdown({ children }) {
  const targetDate = new Date("2026-03-02T00:00:00+05:30"); // IST midnight

  const [currentTime, setCurrentTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch IST time from server
  useEffect(() => {
    fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata")
      .then(res => res.json())
      .then(data => {
        const serverTime = new Date(data.dateTime);
        setCurrentTime(serverTime);
        setLoading(false);
      })
      .catch(() => {
        // fallback to device time
        setCurrentTime(new Date());
        setLoading(false);
      });
  }, []);

  // run ticking clock
  useEffect(() => {
    if (!currentTime) return;

    const timer = setInterval(() => {
      setCurrentTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime]);

  // calculate remaining time
  useEffect(() => {
    if (!currentTime) return;

    const diff = targetDate - currentTime;

    if (diff <= 0) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  }, [currentTime]);

  // loading screen
  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Preparing your surprise…
      </div>
    );
  }

  // birthday reached → open site
  if (!timeLeft) return children;

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center text-center">

      <h1 className="text-3xl md:text-4xl mb-8 font-light">
        Something special unlocks soon…
      </h1>

      <div className="flex gap-8 text-5xl md:text-6xl font-bold">
        <div>
          {timeLeft.days}
          <p className="text-sm mt-2">Days</p>
        </div>
        <div>
          {timeLeft.hours}
          <p className="text-sm mt-2">Hours</p>
        </div>
        <div>
          {timeLeft.minutes}
          <p className="text-sm mt-2">Minutes</p>
        </div>
        <div>
          {timeLeft.seconds}
          <p className="text-sm mt-2">Seconds</p>
        </div>
      </div>

      <p className="mt-10 text-gray-400 text-sm">
        Countdown to March 2 ❤️
      </p>
    </div>
  );
}
