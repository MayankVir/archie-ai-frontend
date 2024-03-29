import axios from "axios";

axios.defaults.baseURL = "http://localhost:6500/api/";

export const loginUserService = (data) => axios.post("/auth", data);

export const createUserService = (data) => axios.post("/user", data);
