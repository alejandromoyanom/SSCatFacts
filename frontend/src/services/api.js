import axios from "axios";

const API_BASE_PATH = "/api";

const api = axios.create({
  baseURL: API_BASE_PATH,
});

export const registerOrLoginUser = async (username) => {
  try {
    const response = await api.post("/users/register-login", {
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
    const response = await api.get("/facts/external");
    return response.data;
  } catch (error) {
    console.error("Error fetching external cat fact:", error);
    throw error;
  }
};

export const likeCatFact = async (userId, factText) => {
  try {
    const response = await api.post("/facts/like", {
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
    const response = await api.get(`/facts/liked/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked cat facts:", error);
    throw error;
  }
};

export const getPopularCatFacts = async () => {
  try {
    const response = await api.get("/facts/popular");
    return response.data;
  } catch (error) {
    console.error("Error fetching popular cat facts:", error);
    throw error;
  }
};
