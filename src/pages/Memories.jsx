import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Memories() {
  const [images, setImages] = useState([]);
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const modules = import.meta.glob(
        "/src/assets/memories/*.{jpg,jpeg,png}",
        { eager: false, as: "url" }
      );

      const loaders = Object.values(modules);

      const imageData = await Promise.all(
        loaders.map(async (loader) => {
          const src = await loader();

          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
              resolve({
                src,
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
            };
          });
        })
      );

      setImages(imageData);
    };

    loadImages();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedMap((prev) => ({ ...prev, [index]: true }));
  };

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
            className={`w-[85%] bg-white p-4 rounded-xl shadow-xl ${
              i % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
          >
            <div className="relative">
              {!loadedMap[i] && (
                <div
                  style={{
                    paddingBottom: `${(img.height / img.width) * 100}%`,
                  }}
                  className="bg-rose-200 animate-pulse rounded-md"
                />
              )}

              <img
                src={img.src}
                width={img.width}
                height={img.height}
                loading="lazy"
                onLoad={() => handleImageLoad(i)}
                className={`w-full h-auto rounded-md object-cover transition-opacity duration-500 ${
                  loadedMap[i] ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              />
            </div>

            <p className="mt-3 text-center text-rose-500 text-sm italic">
              Our Moment ❤️
            </p>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP MASONRY */}
      <div className="hidden sm:block columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg bg-white"
          >
            <div className="relative">
              {!loadedMap[i] && (
                <div
                  style={{
                    paddingBottom: `${(img.height / img.width) * 100}%`,
                  }}
                  className="bg-rose-200 animate-pulse"
                />
              )}

              <img
                src={img.src}
                width={img.width}
                height={img.height}
                loading="lazy"
                onLoad={() => handleImageLoad(i)}
                className={`w-full h-auto object-cover transition-opacity duration-500 ${
                  loadedMap[i] ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              />
            </div>

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