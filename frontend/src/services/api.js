import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const registerOrLoginUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/users/register-login`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error during register/login:", error);
    throw error;
  }
};

export const getExternalCatFact = async () => {
  try {
    const response = await axios.get(`${API_URL}/facts/external`);
    return response.data;
  } catch (error) {
    console.error("Error fetching external cat fact:", error);
    throw error;
  }
};

export const likeCatFact = async (userId, factText) => {
  try {
    const response = await axios.post(`${API_URL}/facts/like`, {
      userId,
      factText,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking cat fact:", error);
    throw error;
  }
};

export const getLikedCatFacts = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/facts/liked/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked cat facts:", error);
    throw error;
  }
};

export const getPopularCatFacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/facts/popular`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular cat facts:", error);
    throw error;
  }
};
