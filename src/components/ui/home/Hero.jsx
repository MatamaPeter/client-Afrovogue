import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import featuredProducts from '../../../assets/data.js'; // Assuming this path is correct

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Limit featured products to 5
  const featuredProductsLimited = featuredProducts.filter(product => product.featured).slice(0, 5);

  const heroSlides = [
    {
      title: "NEW ARRIVALS",
      subtitle: "Curated collections for the discerning",
      bg: "from-amber-100 via-stone-100 to-neutral-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600",
      accent: "text-amber-600 dark:text-amber-400"
    },
    {
      title: "SUMMER SALE",
      subtitle: "Up to 50% off selected items",
      bg: "from-blue-100 via-sky-100 to-cyan-200 dark:from-blue-900 dark:via-sky-800 dark:to-cyan-700",
      accent: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "DESIGNER EDITION",
      subtitle: "Exclusive collaborations",
      bg: "from-purple-100 via-violet-100 to-indigo-200 dark:from-purple-900 dark:via-violet-800 dark:to-indigo-700",
      accent: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "ECO COLLECTION",
      subtitle: "Sustainable fashion for tomorrow",
      bg: "from-emerald-100 via-teal-100 to-cyan-200 dark:from-emerald-900 dark:via-teal-800 dark:to-cyan-700",
      accent: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]); // Added heroSlides.length to dependency array

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[520px]">
      {/* Main Hero Slide */}
      <div 
        className="md:col-span-3 rounded-3xl relative overflow-hidden group transition-all duration-500 shadow-md hover:shadow-xl" // Added shadow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // The inline style for background image isn't needed here as it's dynamically set by the child div
      >
        {/* Dynamic background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-1000`}></div>
        
        {/* Overlay gradient - slightly adjusted for better text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent"></div> {/* Adjusted overlay */}
        
        {/* Slide content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center space-y-4 px-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extralight text-slate-800 dark:text-slate-200 tracking-wide animate-fadeIn animate-slideInUp"> {/* Added font-extralight and a hypothetical slideInUp */}
              {heroSlides[currentSlide].title}
            </h1>
            <p className={`text-lg font-light ${heroSlides[currentSlide].accent} animate-fadeIn animate-slideInUp delay-100`}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className={`w-16 h-0.5 ${heroSlides[currentSlide].accent.replace('text', 'bg')} mx-auto animate-scaleX origin-left`}></div>
            <button className={`mt-6 px-8 py-3 ${heroSlides[currentSlide].accent.replace('text', 'bg')} text-white rounded-full text-sm font-medium hover:opacity-90 transition-all transform hover:scale-105 animate-fadeIn delay-200 shadow-lg hover:shadow-xl relative overflow-hidden
            before:content-[''] before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:origin-left`}> {/* Added pseudo-element for subtle hover effect */}
              SHOP NOW
            </button>
          </div>
        </div>
        
        {/* Navigation arrows (visible on hover) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/50 dark:hover:bg-black/50 transform hover:scale-110" // Added hover scale
        >
          <FiArrowRight className="rotate-180 text-slate-800 dark:text-slate-200" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/50 dark:hover:bg-black/50 transform hover:scale-110" // Added hover scale
        >
          <FiArrowRight className="text-slate-800 dark:text-slate-200" />
        </button>
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-700 dark:text-slate-300 font-mono bg-white/30 dark:bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
            <div className="flex space-x-2 bg-white/30 dark:bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {heroSlides.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-slate-800 dark:bg-slate-200 w-6' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products Panel */}
      <div className="hidden md:block bg-gradient-to-b from-stone-200 to-stone-300 dark:from-slate-700 dark:to-slate-800 rounded-3xl relative overflow-hidden transition-all hover:shadow-lg shadow-sm"> {/* Added shadow-sm */}
        <div className="h-full flex flex-col justify-between p-6">
          <div className="text-right">
            <button 
              onClick={nextSlide} // This button could potentially scroll the featured products or navigate to the product page.
              className="w-10 h-10 bg-slate-800 dark:bg-slate-200 rounded-full mb-4 ml-auto flex items-center justify-center hover:scale-105 transition-transform shadow-md hover:shadow-lg"
            >
              <FiArrowRight className="text-white dark:text-slate-800" />
            </button>
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">Featured Collection</h3> {/* Changed to font-medium */}
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Exclusive pieces selected by our style curators
            </p>
          </div>
          <div className="border-t border-slate-300 dark:border-slate-600 pt-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-widest block mb-3 uppercase"> {/* Added tracking-widest and uppercase */}
              TRENDING NOW
            </span>
            <div className="mt-2 space-y-3">
              {featuredProductsLimited.map(product => (
                <div 
                  key={product.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/30 dark:hover:bg-black/20 transition-colors cursor-pointer group transform hover:scale-[1.01]" // Added hover scale
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    {product.name}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-800">
                    ${product.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;