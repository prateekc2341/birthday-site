import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function LazyImage({ src, quote, rotate = "" }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "100px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`break-inside-avoid rounded-2xl overflow-hidden shadow-lg bg-white ${rotate}`}
    >
      {/* IMAGE FLIP AREA */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsFlipped((prev) => !prev)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT IMAGE */}
          <div style={{ backfaceVisibility: "hidden" }}>
            {!isLoaded && (
              <div className="w-full h-64 bg-rose-200 animate-pulse" />
            )}

            {isVisible && (
              <img
                src={src}
                onLoad={() => setIsLoaded(true)}
                className="w-full h-auto object-cover"
              />
            )}
          </div>

          {/* BACK TEXT */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-300 to-pink-400 text-white text-center p-6"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="text-lg font-semibold leading-relaxed">
              {quote}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ORIGINAL CAPTION (UNCHANGED) */}
      <div className="p-4">
        <p className="text-rose-500 text-sm italic text-center">
          Our Moment ❤️
        </p>
      </div>
    </motion.div>
  );
}

export default LazyImage;