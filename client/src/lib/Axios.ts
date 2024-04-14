import Axios from "axios";
import { decryptData } from "./utils";
import { isUndefined } from "util";
// useAuth

const createAxios = () => {
  if (typeof window === "undefined") {
    return Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });
  }
  
  
  const token = localStorage.getItem("token");
  const authToken = token ? decryptData(token) : "";
  const url= process.env.NEXT_PUBLIC_API_URL;
  const axios = Axios.create({
    baseURL: url,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
    withCredentials: true,
  });

  return axios;
};

export default createAxios;
