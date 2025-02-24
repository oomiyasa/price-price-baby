
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center px-6 py-24"
      >
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-4 text-center">
          Price Price Baby
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto text-center mb-12">
          Simplifying pricing strategy
        </p>
      </motion.div>

      {/* Tools Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Grid cards will be added here */}
          {/* This is a placeholder for the upcoming tools grid */}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
