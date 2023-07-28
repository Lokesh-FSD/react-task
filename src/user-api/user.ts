import axiosInstance from "../utils/axiosIntance";
import { IUser, IUserResponseMany, IUserResponseOne } from "../utils/types";

// Getting all User here
const getAllUsers = async () => {
  const response = await axiosInstance.get<IUserResponseMany>("/users");
  return response.data.data;
};

// Getting user id here
const getUserById = async (id: string) => {
  const response = await axiosInstance.get<IUserResponseOne>(`/user/${id}`);
  return response.data.data;
};

// Creating User here
const createUser = async (userDetails: IUser) => {
  const response = await axiosInstance.post<IUserResponseOne>(
    `/user/create`,
    userDetails
  );
  return response.data.data;
};

// Deleting User Id Here
const deleteUserById = async (id: string) => {
  const response = await axiosInstance.delete<IUserResponseOne>(`/user/${id}`);
  return response.data.data;
};

//Updating User Id Here
const updateUserById = async (id: string, updateDetails: IUser) => {
  const response = await axiosInstance.patch<IUserResponseOne>(
    `/user/${id}`,
    updateDetails
  );
  return response.data.data;
};

export const userAPI = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
