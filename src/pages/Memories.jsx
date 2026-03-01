import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LazyImage from "./LazyImage";

const quotes = [
  "Every picture with you feels like a soft pause in time 🤍",
  "If I could relive one moment forever, it would be this one 💫",
  "You turned ordinary days into beautiful memories 🌸",
  "With you, even silence feels special 🕊️",
  "This is where my heart feels most at home 🏡❤️",
  "You are the calm in all my chaos 🌊",
  "Some memories fade… but not the ones with you 💖",
  "I didn’t just find love, I found my person 🫶",
  "Every frame holds a piece of my happiness 📸✨",
  "If forever had a face, it would look like us 💍"
];

export default function Memories() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const modules = import.meta.glob(
      "/src/assets/memories/*.{jpg,jpeg,png}",
      { eager: false, as: "url" }
    );

    const loaders = Object.values(modules);

    const loadImageUrls = async () => {
      const urls = await Promise.all(loaders.map((loader) => loader()));

      const imageObjects = urls.map((url, index) => ({
        src: url,
        quote: quotes[index % quotes.length], // rotate if more images
      }));

      setImages(imageObjects);
    };

    loadImageUrls();
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-16 py-16 bg-gradient-to-br from-rose-100 via-pink-50 to-pink-200">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-rose-600 mb-12"
      >
        Our Memories 📸
      </motion.h2>

      {/* MOBILE */}
      <div className="flex flex-col items-center gap-10 sm:hidden">
        {images.map((img, i) => (
          <LazyImage key={i}
            src={img.src}
            quote={img.quote}
            rotate={i % 2 === 0 ? "rotate-2" : "-rotate-2"}
          />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:block columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <LazyImage key={i} src={img.src} quote={img.quote}/>
        ))}
      </div>
    </div>
  );
}