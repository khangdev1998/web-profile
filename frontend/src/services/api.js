import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/constants";

const API_URL = `${BASE_BACKEND_URL}/api`;

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles?populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
// http://localhost:1337/api/articles?filters[slug]=top-348-websites-every-developer-should-know
// top-348-websites-every-developer-should-know
export const fetchPostBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles?populate=*&filters[slug]=${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
