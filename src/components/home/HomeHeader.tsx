
import { motion } from "framer-motion";

export function HomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center px-6 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-semibold text-[#4A4A3F] tracking-tight mb-4 text-center">
        Price Price Baby
      </h1>
      <p className="text-xl text-[#6B6B5F] max-w-md mx-auto text-center mb-12">
        Simplifying pricing strategy
      </p>
    </motion.div>
  );
}
