import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

const axiosInstance = axios.create({
  withCredentials: true, // Send cookies with requests
});

export const login = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/auth/google`);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error)
  }
};

export const getNotes = async (page) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/dashboard?page=${page}`);
    console.log(response)
    return response.data;
  } catch(error) {
    console.error("Error fetching notes:", error)
  }
};

export const getNoteById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/dashboard/item/${id}`);
  return response.data;
};

export const addNote = async (noteData) => {
  const response = await axiosInstance.post(`${API_URL}/dashboard/add`, noteData);
  return response.data;
};

export const updateNote = async( id, noteData ) => {
  const response = await axiosInstance.put(`${API_URL}/dashboard/item/${id}`, noteData);
  return response.data;
}

export const deleteNote = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/dashboard/item-delete/${id}`);
  return response.data
};


