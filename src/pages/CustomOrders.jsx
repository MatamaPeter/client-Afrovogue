import React, { useState } from 'react';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';
import SizeGuide from '../components/ui/product/SizeGuide';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clothingType: '',
    description: '',
    measurements: '',
    referenceImages: [],
    deliveryDate: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const clothingTypes = [
    'Dress',
    'Shirt',
    'Skirt',
    'Pants',
    'Jacket',
    'Traditional Attire',
    'Headwrap',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      referenceImages: [...prev.referenceImages, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.clothingType) newErrors.clothingType = 'Clothing type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.measurements.trim()) newErrors.measurements = 'Measurements are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Custom order request submitted:', formData);
      
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        clothingType: '',
        description: '',
        measurements: '',
        referenceImages: [],
        deliveryDate: '',
        budget: ''
      });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Custom African Clothing Request</h1>
          <p className="mt-2 opacity-90">Get your unique, handcrafted African-inspired clothing tailored just for you</p>
        </div>
        
        {isSuccess && (
          <div className="bg-green-50 dark:bg-green-900/30 p-4 text-green-700 dark:text-green-300 flex items-center gap-3">
            <FiCheckCircle className="text-xl" />
            <div>
              <p className="font-medium">Request submitted successfully!</p>
              <p className="text-sm">We'll contact you within 24 hours to discuss your order.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="clothingType" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Clothing Type <span className="text-red-500">*</span>
              </label>
              <select
                id="clothingType"
                name="clothingType"
                value={formData.clothingType}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  errors.clothingType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select clothing type</option>
                {clothingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.clothingType && <p className="mt-1 text-sm text-red-500">{errors.clothingType}</p>}
            </div>

            <div>
              <label htmlFor="budget" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Budget Estimate
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Design Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your custom design, preferred fabrics, colors, patterns, etc."
              rows="4"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="measurements" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Measurements <span className="text-red-500">*</span>
            </label>
            <textarea
              id="measurements"
              name="measurements"
              value={formData.measurements}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.measurements ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Provide detailed measurements (bust, waist, hips, length, etc.)"
              rows="3"
            />
            {errors.measurements && <p className="mt-1 text-sm text-red-500">{errors.measurements}</p>}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Don't know your measurements? <button type="button" onClick={() => setSizeGuideOpen(true)} className="text-indigo-600 dark:text-indigo-400 hover:underline">See our measurement guide</button>
            </p>
            <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Reference Images
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                <FiUpload className="text-2xl text-indigo-600 dark:text-indigo-400" />
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Upload images</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            
            {formData.referenceImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.referenceImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Reference ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="deliveryDate" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Desired Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            By submitting this form, you agree to our <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CustomOrders;