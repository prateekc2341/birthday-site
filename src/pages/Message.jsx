import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const sections = [
`I love you & I'm thankful for having a partner who loves me the way I'm.`,

`I don't know how to describe every word about you because I wanna make you feel special for everything you have done for me, from handling me in worse times to cheering me up I always feel blessed to have a soulmate like you who has made me realized that "Love exists its true you dont need to be rich, or beautiful or handsome, it's just about two people not giving up on each other, you love me, whenever I say "I love you" I always mean it.`,

`I love it when you say "I'm lucky to have you", whenever you say "You understand me like no one else trust me it feels much better because even I have no one whom I can run to when I'm sad,I cry in your arms,I laugh with you, I feel better talking to you late nights,I don't need anything, I just love you the way you're,`,

`little things you care about me, little things you remember about me, things you make sure dont make me feel bad about.`,

`You're the best person I could ever have & whenever I'm angry please forgive me, don't get upset when I say leave me, I never want you to leave me I always want you "Today, Tomorrow and forever" because you're not just my partner, you're my Soulmate`,

`I love you more than anything`
];

export default function Message() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const bottomRef = useRef(null);

  // TYPEWRITER EFFECT
  useEffect(() => {
    if (!open) return;
    if (currentSection >= sections.length) return;

    const currentText = sections[currentSection];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const sectionPause = setTimeout(() => {
        setDisplayedText((prev) => prev + "\n\n");
        setCurrentSection((prev) => prev + 1);
        setCharIndex(0);
      }, 1200);
      return () => clearTimeout(sectionPause);
    }
  }, [charIndex, currentSection, open]);

  // AUTO SCROLL (only mobile)
  useEffect(() => {
    if (!open) return;

    if (window.innerWidth < 640) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [displayedText, open]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[#f3e8dc]">

      {!open ? (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-8 py-4 bg-rose-700 text-white rounded-full text-xl shadow-lg hover:scale-105 transition"
        >
          Open The Letter 💌
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl w-full bg-[#fffaf3] p-6 sm:p-12 rounded-lg shadow-2xl border border-[#e4d5c3] max-h-[85vh] overflow-y-auto"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-700 rounded-t-lg" />

          <h2
            className="text-3xl sm:text-4xl text-rose-800 mb-8 text-center"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            A Message For You
          </h2>

          <p
            className="text-xl sm:text-2xl leading-8 sm:leading-10 text-gray-800 whitespace-pre-line"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            {displayedText}
            {currentSection < sections.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>

          <div ref={bottomRef} />
        </motion.div>
      )}
    </div>
  );
}