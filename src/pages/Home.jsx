
import Testimonials from '../components/ui/home/Testimonials';
import Hero from '../components/ui/home/Hero';
import FeaturedProducts from '../components/ui/home/FeaturedProducts';
import Categories from '../components/ui/home/Categories';
import Newsletter from '../components/ui/home/Newsletter';

function Home() {
  
 





  return (
    <div className= "bg-stone-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 py-8">
        <Hero/>
        <FeaturedProducts />
        <Categories />
        <Newsletter />
        <Testimonials />

      </div>
    </div>
  );
}

export default Home;