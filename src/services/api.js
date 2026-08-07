import axios from 'axios';

// الرابط الفعلي لمشروعك على Vercel
const API_URL = 'https://vercel.app'; 

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
    return null;
  }
};
