
function Newsletter() {
  return (
    <div>
      <div className="bg-gradient-to-r from-amber-50 to-stone-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-4">Stay Updated</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="px-6 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 rounded-full text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Newsletter
