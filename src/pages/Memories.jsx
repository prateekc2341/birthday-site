import { motion } from "framer-motion";

const images = [
  `${import.meta.env.BASE_URL}images/pic1.jpg`,
  `${import.meta.env.BASE_URL}images/pic2.jpg`,
  `${import.meta.env.BASE_URL}images/pic3.jpg`,
];

export default function Memories() {
  return (
    <div className="min-h-screen px-6 md:px-16 py-16">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold text-center text-pink-600 mb-12"
      >
        Our Memories 📸
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl overflow-hidden shadow-xl bg-white/60 backdrop-blur-md"
          >
            <img src={img} className="w-full h-[320px] object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
