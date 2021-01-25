import axios from "axios";

const axiosAuth = (token) =>
  axios.create({ headers: { authorization: token } });

export default axiosAuth;
