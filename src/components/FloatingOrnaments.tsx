import { motion } from "framer-motion";

const ornaments = [
  { emoji: "🎄", size: 40, left: "5%", top: "20%", delay: 0 },
  { emoji: "🎁", size: 35, left: "90%", top: "15%", delay: 0.5 },
  { emoji: "⭐", size: 30, left: "15%", top: "70%", delay: 1 },
  { emoji: "🔔", size: 32, left: "85%", top: "65%", delay: 1.5 },
  { emoji: "❄️", size: 28, left: "10%", top: "45%", delay: 2 },
  { emoji: "🎅", size: 38, left: "92%", top: "40%", delay: 2.5 },
];

export const FloatingOrnaments = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ornaments.map((ornament, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: ornament.left,
            top: ornament.top,
            fontSize: ornament.size,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.6,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: ornament.delay, duration: 0.5 },
            y: {
              delay: ornament.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {ornament.emoji}
        </motion.div>
      ))}
    </div>
  );
};
