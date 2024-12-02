import axios from "axios";
import { baseUrl } from "../constants/url.constants";


const httModule=axios.create({
    baseURL:baseUrl,
});
export default httModule