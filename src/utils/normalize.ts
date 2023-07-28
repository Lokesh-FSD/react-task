import { IUser, IUserResponseData } from "./types";

export const normalizeData = (
  data: IUserResponseData[]
): { [id: string]: IUser } => {
  let updatedData: { [id: string]: IUser } = {};
  data.forEach((item) => {
    const key: string = item._id;

    updatedData[key] = {
      firstName: item.firstName,
      lastName: item.lastName,
      phoneNumber: item.phoneNumber,
      age: item.age,
    };
  });

  return updatedData;
};
