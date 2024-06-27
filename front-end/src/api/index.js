import axios from "axios";

const API = "http://localhost:3000";

export default axios.create({
  baseURL: API,
});
