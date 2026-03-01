import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const timelineData = [
  {
    date: "July 1, 2024",
    title: "The Day I First Saw You",
    description:
      "You walked into the office for your interview, and it was just a normal interaction. I had no idea that this simple day would later mean so much to me.",
  },
  {
    date: "July 11, 2024",
    title: "The Luckiest Day of My Life",
    description:
      "Your first day at the office. The same day I became a CA. I thought becoming a CA was the biggest blessing that day… but maybe it was you walking in.",
  },
  {
    date: "June 4, 2025",
    title: "The Day We Became Us",
    description:
      "The day I stopped calling you just a friend. The day we chose each other. The day 'me' and 'you' quietly became 'us'.",
  },
  {
    date: "August 2, 2025",
    title: "I Told My Parents About You",
    description:
      "I was nervous, but proud. Because loving you felt right. Saying your name at home felt serious… and beautiful.",
  },
  {
    date: "August 8, 2025",
    title: "You Told Your Parents",
    description:
      "When you told your parents about us, it meant everything to me. It showed me how real we are. How strong we are.",
  },
  {
    date: "November 23, 2025",
    title: "When Our Families Met",
    description:
      "Watching our parents meet felt surreal. Two different worlds sitting together because of something we started.",
  },
  {
    date: "January 1, 2026",
    title: "Starting The Year With You",
    description:
      "Our New Year celebration wasn’t just a party. It felt like we were stepping into a new chapter together. I couldn’t have imagined starting the year without you.",
  },
  {
    date: "February 5, 2026",
    title: "The Emotional Goodbye",
    description:
      "The day I left the office. It wasn’t just about work. That place gave me you. And walking away felt emotional in more ways than one.",
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-12 md:mb-16">

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between w-full">

        {/* Left Side */}
        <div className="w-5/12">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-xl"
            >
              <p className="text-sm text-rose-400 mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold text-rose-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          )}
        </div>

        {/* Center Dot */}
        <div className="relative flex flex-col items-center">
          <div className="w-5 h-5 bg-rose-500 rounded-full z-10" />
        </div>

        {/* Right Side */}
        <div className="w-5/12">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-xl"
            >
              <p className="text-sm text-rose-400 mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold text-rose-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative pl-8">
        <div className="absolute left-0 top-2 w-4 h-4 bg-rose-500 rounded-full" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white p-5 rounded-2xl shadow-lg"
        >
          <p className="text-sm text-rose-400 mb-2">{item.date}</p>
          <h3 className="text-lg font-semibold text-rose-600 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-pink-50 to-rose-100">
      
      <h2 className="text-3xl md:text-5xl font-bold text-center text-rose-600 mb-16 md:mb-20">
        Our Story So Far…
      </h2>

      <div className="relative max-w-5xl mx-auto">

        {/* Vertical Line (Desktop Only) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-rose-300 h-full" />

        {timelineData.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Forever Block */}
        <div className="relative flex justify-center mt-16 md:mt-24 px-2">
          <div className="bg-white max-w-xl text-center p-8 md:p-10 rounded-3xl shadow-2xl border border-rose-200">
            
            <p className="text-sm text-rose-400 mb-3">Forever</p>

            <h3 className="text-xl md:text-3xl font-bold text-rose-600 mb-4">
              The Best Is Yet To Come
            </h3>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              This is only our story so far. I don’t know what the future holds,
              but I know I want every chapter to have you in it.
            </p>

            <div className="mt-6 text-2xl">❤️</div>
          </div>
        </div>

      </div>
    </section>
  );
}