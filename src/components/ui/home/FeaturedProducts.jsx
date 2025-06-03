import { FiArrowRight } from 'react-icons/fi';
import products from '../../../assets/data.js';
import Product from './../product/Product.jsx';

function FeaturedProducts() {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
            Featured Products
          </h2>
          <a
            href="#"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center"
          >
            View all <FiArrowRight className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
