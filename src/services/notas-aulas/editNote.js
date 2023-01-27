import axios from "axios";
import URL from "URL";

const editNote = async (data) => {
  const api = axios.create({ baseURL: URL.servidor });
  const request = await api.put(
    "/api-php-react/info_notas_aulas.php",
    JSON.stringify(data)
  );
  return request;
};

export default editNote;
