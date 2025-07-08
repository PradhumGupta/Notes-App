import axios from 'axios';

export const API_URL = import.meta.mode === "development" ? "http://localhost:5000/api" : "https://notes-app-backend-98b1.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies with requests
});

export const getNotes = async (page) => {
  try {
    const response = await axiosInstance.get(`/dashboard?page=${page}`);
    console.log(response)
    return response.data;
  } catch(error) {
    console.error("Error fetching notes:", error);
  }
};

export const getNoteById = async (id) => {
  const response = await axiosInstance.get(`/dashboard/item/${id}`);
  return response.data;
};

export const addNote = async (noteData) => {
  const response = await axiosInstance.post('/dashboard/add', noteData);
  return response.data;
};

export const updateNote = async( id, noteData ) => {
  const response = await axiosInstance.put(`/dashboard/item/${id}`, noteData);
  return response.data;
}

export const deleteNote = async (id) => {
  const response = await axiosInstance.delete(`/dashboard/item-delete/${id}`);
  return response.data
};


