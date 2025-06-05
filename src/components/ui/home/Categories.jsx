import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import products from '../../../assets/data.js';

function Categories() {
  const navigate = useNavigate();

  // Extract unique categories from products
  const uniqueCategories = Array.from(new Set(products.map(product => product.category.toLowerCase())));

  // Mapping of category names to background gradient classes
  const categoryBgMap = {
    women: "from-rose-100 to-pink-200 dark:from-rose-900/30 dark:to-pink-800/30",
    men: "from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30",
    kids: "from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30",
    "his & hers": "from-purple-100 to-violet-200 dark:from-purple-900/30 dark:to-violet-800/30"
  };

  // Capitalize category names for display
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Generate categories array dynamically
  const categories = uniqueCategories.map(cat => ({
    name: cat.split(' ').map(word => capitalize(word)).join(' '),
    bg: categoryBgMap[cat] || "from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30"
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Categories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
            Collections
          </h2>
          <a onClick={() => navigate('/shop')} className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center">
            View all <FiArrowRight className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              onClick={() => navigate(`/shop?category=${category.name.toLowerCase()}`)}
              className={`bg-gradient-to-br ${category.bg} rounded-2xl h-[140px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-full flex items-center justify-center relative">
                <div className="text-center">
                  <h3 className="text-xl font-light text-slate-800 dark:text-slate-200 mb-1">{category.name}</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono tracking-wider">EXPLORE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Collection */}
      <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-200 dark:from-emerald-900/30 dark:via-teal-800/30 dark:to-cyan-700/30 rounded-3xl relative overflow-hidden group cursor-pointer transition-all duration-700 hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-black/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative p-8 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono tracking-wider">TRENDING</span>
            </div>
            
            <h2 className="text-3xl font-light text-slate-800 dark:text-slate-200 leading-tight">
              Premium<br />
              Collection
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Handpicked essentials that define contemporary elegance and timeless sophistication.
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-slate-300/50 dark:border-slate-600/50">
            <span onClick={() => navigate('/shop')} className="text-sm text-slate-600 dark:text-slate-400 font-mono">VIEW ALL</span>
            <div className="w-8 h-8 bg-slate-800 dark:bg-slate-200 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <FiArrowRight className="text-white dark:text-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
