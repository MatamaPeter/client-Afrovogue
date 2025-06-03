import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen  text-white p-6 flex flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated floating astronaut illustration */}
      <motion.div 
        className="relative mb-8 w-64 h-64"
        variants={floatingVariants}
        animate="float"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          {/* Helmet */}
          <div className="w-32 h-32 rounded-full bg-white bg-opacity-10 border-2 border-white border-opacity-30 relative">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 bg-opacity-20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-70"></div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="w-24 h-32 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-md mx-auto mt-2 relative">
            {/* Arms */}
            <div className="absolute top-4 -left-6 w-6 h-16 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-full"></div>
            <div className="absolute top-4 -right-6 w-6 h-16 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-full"></div>
          </div>
        </div>
        {/* Floating planets */}
        <div className="absolute top-10 -left-4 w-8 h-8 rounded-full bg-yellow-200 shadow-lg"></div>
        <div className="absolute bottom-4 -right-2 w-12 h-12 rounded-full bg-blue-300 shadow-lg"></div>
      </motion.div>

      <motion.h1 
        className="text-9xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400"
        variants={itemVariants}
      >
        404
      </motion.h1>

      <motion.p 
        className="text-2xl md:text-3xl mb-6 font-semibold text-center"
        variants={itemVariants}
      >
        Houston, we have a problem!
      </motion.p>

      <motion.p 
        className="mb-8 max-w-md text-center text-lg opacity-90"
        variants={itemVariants}
      >
        The page you're looking for is lost in space. Maybe it's orbiting somewhere else or got sucked into a black hole.
      </motion.p>

      <motion.button
        onClick={() => navigate("/")}
        className="relative px-8 py-4 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <span className="relative z-10">Beam Me Home</span>
        {isHovered && (
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>

      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}