import { motion } from "framer-motion";

export default function Message() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-pink-600 mb-8"
      >
        A Message For You 💌
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl text-lg text-gray-700 leading-relaxed"
      >
        You came into my life and made everything brighter.  
        I don’t just love you for who you are, but for how I feel when I’m with you.  

        Thank you for being my happiness, my calm, my safe place.  
        I promise to stand beside you, support you, and love you endlessly. 💖
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-10 text-4xl font-bold text-pink-600"
      >
        I Love You ❤️
      </motion.div>
    </div>
  );
}
