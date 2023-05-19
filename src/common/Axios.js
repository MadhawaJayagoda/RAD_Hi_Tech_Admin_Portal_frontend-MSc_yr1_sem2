import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error) {
      const response = await axios.post(
        "/token/refresh",
        { userID: "6463e3a13a6e24ffce8a4ae7" },
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Update the Authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["AccessToken"]}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
