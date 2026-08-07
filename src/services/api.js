import axios from 'axios';

// Lien de votre serveur de production Vercel
const API_URL = 'https://vercel.app'; 

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Erreur réseau Vercel :", error);
    return null;
  }
};

