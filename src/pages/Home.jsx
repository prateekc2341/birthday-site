import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {

  const words = [
    "Preeti",          
    "My Love",
    "My Happiness",
    "My Baby",
    "My Forever"
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const currentWord = words[wordIndex];

  let typingSpeed = isDeleting ? 120 : 220; 
  // slower typing & deleting

  const timeout = setTimeout(() => {

    if (!isDeleting) {
      // typing forward slowly
      setDisplayedText(currentWord.substring(0, displayedText.length + 1));

      // pause when word completed
      if (displayedText === currentWord) {
        typingSpeed = 2000; // stay on full word longer
        setIsDeleting(true);
      }

    } else {
      // slow backspacing
      setDisplayedText(currentWord.substring(0, displayedText.length - 1));

      // move to next word
      if (displayedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

  }, typingSpeed);

  return () => clearTimeout(timeout);

}, [displayedText, isDeleting, wordIndex]);


  return (
    <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/pic4.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 px-6">

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg md:text-xl text-rose-200 tracking-wide"
        >
          Happy Birthday
        </motion.h2>

        {/* rotating typewriter */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl md:text-8xl font-bold text-rose-100 mt-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
        >
          {displayedText}
          <span className="animate-pulse text-pink-300">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mt-6 text-lg md:text-xl text-rose-50 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
        >
          You turned my life into the most beautiful story I’ve ever lived. 💖
        </motion.p>

      </div>
    </div>
  );
}
