import Axios from "axios-observable";
import { FM_API_URL } from "@/variables";

const fmAPI = Axios.create({
  baseURL: FM_API_URL,
});

export { fmAPI };
