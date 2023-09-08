import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../types';
import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction('user/setUser', (data) => ({
  payload: data,
}));



export const registerUser = createAsyncThunk("auth/registerUser", async ({name , email, password }) => {
  try {
    const response = await axios.post(`${URL}/Auth/register`, {
      name,
      email,
      password,
        });
    return response.data;
  } catch (error) {
    throw error;
  }
});





export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  try {
    const response = await axios.post(`${URL}/Auth/login`, {
      email,
      password,
    });
    const user = response.data;
    if (user.token) {
      sessionStorage.setItem("userToken", user.token); 
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("userRol", user.role);       
    }
    return user;
  } catch (error) {
    throw error;
  }
});




export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(`${URL}/Auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
});