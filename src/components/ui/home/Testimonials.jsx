import { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Amina K.",
      location: "Lagos, Nigeria",
      text: "I love the quality and style of AfroVogue products. The attention to detail and authentic African designs make me proud to wear them. Highly recommend!",
      rating: 5,
      date: "March 15, 2023"
    },
    {
      id: 2,
      name: "Kwame N.",
      location: "Accra, Ghana",
      text: "Great customer service and fast shipping. I had an issue with sizing and the team resolved it immediately. Will definitely shop again.",
      rating: 4,
      date: "February 28, 2023"
    },
    {
      id: 3,
      name: "Fatima S.",
      location: "Nairobi, Kenya",
      text: "Beautiful designs and excellent craftsmanship. As someone who values sustainable fashion, I appreciate AfroVogue's commitment to ethical production.",
      rating: 5,
      date: "April 2, 2023"
    },
    {
      id: 4,
      name: "Tunde O.",
      location: "Johannesburg, South Africa",
      text: "The fabrics are incredibly comfortable and the patterns are stunning. I've received countless compliments on my AfroVogue pieces.",
      rating: 5,
      date: "January 10, 2023"
    },
    {
      id: 5,
      name: "Nia M.",
      location: "Dakar, Senegal",
      text: "As a diaspora African, wearing AfroVogue makes me feel connected to my roots. The quality exceeds my expectations every time.",
      rating: 5,
      date: "May 5, 2023"
    }
  ];

  const visibleTestimonials = window.innerWidth >= 768 ? 3 : 1;
  const totalSlides = Math.ceil(testimonials.length / visibleTestimonials);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleTestimonials = () => {
    const start = activeIndex * visibleTestimonials;
    return testimonials.slice(start, start + visibleTestimonials);
  };

  return (
    <div className="mb-16 max-w-6xl mx-auto px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-light text-slate-800 dark:text-slate-200 tracking-wide mb-2">
          What Our Customers Say
        </h2>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mb-6"></div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Hear from our satisfied customers across Africa and the diaspora about their AfroVogue experiences
        </p>
      </div>

      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous testimonials"
        >
          <FaChevronLeft className="text-amber-500" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getVisibleTestimonials().map(testimonial => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
              <FaQuoteLeft className="text-amber-400/20 text-5xl absolute top-4 left-4" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">{testimonial.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-sm ${i < testimonial.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
                    />
                  ))}
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">{testimonial.date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{testimonial.text}</p>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <FiShoppingBag className="mr-1" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
          aria-label="Next testimonials"
        >
          <FaChevronRight className="text-amber-500" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Testimonials;