import axios from "axios";

axios.defaults.baseURL = "http://localhost:4789/api/";

axios.defaults.headers = {
  "x-auth-token": localStorage.getItem("token") ?? "",
};

let counter = 0;

export const submitQueryService = (data) => axios.post("/conversation", data);

export const getConversationsService = (data) =>
  axios.get("/conversation", data);

export const pollOutputService = (data) =>
  // axios.post("/conversation/poll", data);
  new Promise((resolve, reject) => {
    resolve({ status: counter++ === 10 });
  });
