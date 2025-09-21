import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewTokens } from "../services/token";

//baseurl
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
    return response
}, async(error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
        orginalRequest._retey = true;

        const res = await getNewTokens();
        if (!res?.response) return;
        setCookie(res.response.data)
        console.log(res)

        return api(orginalRequest);
    }
})

export default api;
