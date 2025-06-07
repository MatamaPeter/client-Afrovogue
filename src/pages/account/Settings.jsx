import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Lock, Save, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadImage } from '../../services/uploadService';
import axios from 'axios';
import PropTypes from 'prop-types';

// Constants for API endpoints and validation
const API_ENDPOINTS = {
  PROFILE: '/api/users/profile',
  ADDRESSES: '/api/users/addresses'
};

const PASSWORD_MIN_LENGTH = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

// Optimized InputField component
const InputField = React.memo(({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  ...props
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all duration-200 ${
        error ? 'border-red-500 ring-red-200' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

const Settings = () => {
  // State management
  const [settings, setSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePhoto: '',
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    streetAddress: '',
    city: '',
    town: '',
    state: '',
    postalCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  // Memoized auth config
  const getAuthConfig = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }), []);

  // Data fetching
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileResponse, addressResponse] = await Promise.all([
          axios.get(API_ENDPOINTS.PROFILE, getAuthConfig),
          axios.get(API_ENDPOINTS.ADDRESSES, getAuthConfig)
        ]);

        const { firstName, lastName, email, phone, profilePhoto } = profileResponse.data;
        setSettings(prev => ({
          ...prev,
          firstName,
          lastName,
          email,
          phone,
          profilePhoto: profilePhoto || ''
        }));

        setAddresses(addressResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toast.error('Failed to load user data.');
      }
    };

    fetchUserData();
  }, [getAuthConfig]);

  // Stable handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setSettings(prev => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleAddressChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewAddress(prev => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
  }, []);

  const addAddress = async () => {
    if (!newAddress.streetAddress.trim() || !newAddress.city.trim()) {
      toast.error('Street Address and City are required.');
      return;
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.ADDRESSES,
        newAddress,
        getAuthConfig
      );
      
      setAddresses(prev => [...prev, response.data]);
      setNewAddress({
        streetAddress: '',
        city: '',
        town: '',
        state: '',
        postalCode: ''
      });
      toast.success('Address added successfully!');
    } catch (error) {
      console.error('Failed to add address:', error);
      toast.error(error.response?.data?.message || 'Failed to add address.');
    }
  };

  const removeAddress = async (index) => {
    try {
      await axios.delete(
        `${API_ENDPOINTS.ADDRESSES}/${index}`,
        getAuthConfig
      );
      setAddresses(prev => prev.filter((_, i) => i !== index));
      toast.success('Address removed successfully!');
    } catch (error) {
      console.error('Failed to remove address:', error);
      toast.error(error.response?.data?.message || 'Failed to remove address.');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadImage(file, localStorage.getItem('token'));
      setSettings(prev => ({ ...prev, profilePhoto: data.url }));
      toast.success('Profile photo uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload profile photo.');
    } finally {
      setUploading(false);
    }
  };

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!settings.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!settings.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!settings.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(settings.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (settings.password || settings.confirmPassword) {
      if (settings.password.length < PASSWORD_MIN_LENGTH) {
        newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
      }
      
      if (settings.password !== settings.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [settings]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors before saving.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const body = {
        firstName: settings.firstName,
        lastName: settings.lastName,
        email: settings.email,
        phone: settings.phone,
        password: settings.password || undefined,
        profilePhoto: settings.profilePhoto,
      };

      await axios.put(API_ENDPOINTS.PROFILE, body, getAuthConfig);
      toast.success('Settings updated successfully!');
      
      // Clear password fields after successful update
      setSettings(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error.response?.data?.message || 'Failed to save settings. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized address fields to prevent unnecessary re-renders
  const addressFields = useMemo(() => (
    ['streetAddress', 'city', 'town', 'state', 'postalCode'].map(field => (
      <InputField
        key={field}
        id={field}
        name={field}
        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        value={newAddress[field]}
        onChange={handleAddressChange}
        placeholder={`Enter ${field}`}
      />
    ))
  ), [newAddress, handleAddressChange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg my-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Account Settings
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Manage your profile and security settings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Profile Settings Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <User className="text-indigo-600 dark:text-indigo-400 text-4xl" />
            Profile Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="firstName"
              name="firstName"
              label="First Name"
              value={settings.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            
            <InputField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={settings.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            
            <InputField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={settings.email}
              onChange={handleChange}
              error={errors.email}
            />
            
            <InputField
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={settings.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            
            <div className="col-span-full">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300"
              />
              {uploading && <p className="mt-2 text-sm text-indigo-500">Uploading...</p>}
              {settings.profilePhoto && (
                <div className="mt-4">
                  <img
                    src={settings.profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Settings Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <Lock className="text-indigo-600 dark:text-indigo-400 text-4xl" />
            Security Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="password"
              name="password"
              label="New Password"
              type="password"
              value={settings.password}
              onChange={handleChange}
              error={errors.password}
            />
            
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={settings.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        {/* Address Management Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            <MapPin className="text-indigo-600 dark:text-indigo-400 text-4xl" />
            Addresses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addressFields}
          </div>
          
          <button
            type="button"
            onClick={addAddress}
            className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm transition"
          >
            Add Address
          </button>

          {/* Existing Addresses */}
          <div className="mt-8 space-y-4">
            {addresses.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No addresses added yet.</p>
            )}
            
            {addresses.map((addr, idx) => (
              <div
                key={addr._id || idx}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
              >
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {addr.streetAddress}, {addr.city}, {addr.town}, {addr.state}, {addr.postalCode}
                </div>
                <button
                  onClick={() => removeAddress(addr._id || idx)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;