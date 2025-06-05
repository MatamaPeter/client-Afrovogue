import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../components/ui/product/Product";
import products from "../../assets/data";
import reviews from "../../assets/reviews";

const Shop = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(product => product.category))];
    return ["all", ...cats];
  }, []);

  // Set filterCategory, searchTerm, sortBy, and priceRange from URL query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const search = params.get("search") || "";
    if (location.search === "") {
      // Reset all filters to default when no query params
      setFilterCategory("all");
      setSearchTerm("");
      setSortBy("name");
      setPriceRange([0, 1000]);
    } else {
      if (category && categories.includes(category)) {
        setFilterCategory(category);
      } else {
        setFilterCategory("all");
      }
      setSearchTerm(search);
    }
  }, [location.search, categories]);

  // Calculate average rating and review count for each product
  const getRatingData = (productId) => {
    const productReviews = reviews.filter(review => review.productId === productId);
    const reviewCount = productReviews.length;
    const averageRating = reviewCount > 0 
      ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
      : 0;
    return { averageRating: parseFloat(averageRating), reviewCount };
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || product.category === filterCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, filterCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setFilterCategory("all");
    setPriceRange([0, 1000]);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search Products</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-1/2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-1/2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header with Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Shop</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredAndSortedProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="flex gap-4 items-center">
                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 text-sm transition-colors ${viewMode === "grid" 
                      ? "bg-blue-500 text-white" 
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-sm transition-colors ${viewMode === "list" 
                      ? "bg-blue-500 text-white" 
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredAndSortedProducts.map(product => {
                  const { averageRating, reviewCount } = getRatingData(product.id);
                  return (
                    <Product 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                      rating={averageRating}
                      reviewCount={reviewCount}
                    />
                  );
                })}
              </div>
            )}

            {/* Load More Button (if you want to implement pagination) */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing all {filteredAndSortedProducts.length} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
