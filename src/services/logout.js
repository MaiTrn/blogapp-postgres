import axios from "axios";
import { getConfig } from "./blogs";
const baseUrl = "/api/logout";

const logout = async () => {
  const response = await axios.delete(baseUrl, getConfig());
  return response.data;
};

const logoutService = { logout };
export default logoutService;
