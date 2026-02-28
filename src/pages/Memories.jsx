import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Memories() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const modules = import.meta.glob(
        "/src/assets/memories/*.{jpg,jpeg,png}",
        { eager: false, as: "url" }
      );

      const loadedImages = await Promise.all(
        Object.values(modules).map((loader) => loader())
      );

      setImages(loadedImages);
    };

    loadImages();
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

      {/* MOBILE SCRAPBOOK */}
      <div className="flex flex-col items-center gap-10 sm:hidden">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`w-[85%] bg-white p-4 rounded-xl shadow-xl 
              ${i % 2 === 0 ? "rotate-2" : "-rotate-2"}`}
          >
            <img
              src={img}
              loading="lazy"
              className="w-full rounded-md object-cover"
            />
            <p className="mt-3 text-center text-rose-500 text-sm italic">
              Our Moment ❤️
            </p>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP PINTEREST */}
      <div className="hidden sm:block columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg bg-white"
          >
            <img
              src={img}
              loading="lazy"
              className="w-full object-cover hover:scale-105 transition duration-500"
            />

            <div className="p-4">
              <p className="text-rose-500 text-sm italic text-center">
                Our Moment ❤️
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}