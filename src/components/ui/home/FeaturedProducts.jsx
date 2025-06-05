import { FiArrowRight } from 'react-icons/fi';
import products from '../../../assets/data.js';
import reviews from '../../../assets/reviews.js';
import Product from './../product/Product.jsx';
import { useNavigate } from 'react-router-dom';


function FeaturedProducts() {
  const featuredProducts = products.filter(product => product.featured);
  const navigate = useNavigate();

  // Calculate average rating and review count for each product
  const getRatingData = (productId) => {
    const productReviews = reviews.filter(review => review.productId === productId);
    const reviewCount = productReviews.length;
    const averageRating = reviewCount > 0 
      ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
      : 0;
    return { averageRating: parseFloat(averageRating), reviewCount };
  };

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
            Featured Products
          </h2>
          <a
            onClick={() => navigate('/shop')}
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center"
          >
            View all <FiArrowRight className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const { averageRating, reviewCount } = getRatingData(product.id);
            return (
              <Product 
                key={product.id} 
                product={product} 
                rating={averageRating} 
                reviewCount={reviewCount} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
