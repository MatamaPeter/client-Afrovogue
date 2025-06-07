import axios from 'axios';

const API_URL = '/api/upload';

export const uploadImage = async (imageFile, token) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};
