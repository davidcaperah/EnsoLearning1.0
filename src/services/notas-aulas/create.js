import axios from "axios";
import URL from "URL";

const create = async (data) => {
  try {
    const api = axios.create({ baseURL: URL.servidor });
    const request = await api.post(
      "api-php-react/info_notas_aulas.php",
      JSON.stringify(data)
    );
    return request;
  } catch (error) {
    throw error;
  }
};

export default create;
