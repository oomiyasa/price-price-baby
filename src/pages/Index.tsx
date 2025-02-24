
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-4">
          Welcome to
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
          PPB
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Start building your premium web experience with elegance and simplicity.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;

