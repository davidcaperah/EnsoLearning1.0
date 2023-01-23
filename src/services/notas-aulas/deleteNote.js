import axios from "axios";
import URL from "URL";

const deleteNote = async (data) => {
  const api = axios.create({ baseURL: URL.servidor });
  const request = api.post(
    "/api-php-react/info_notas_aulas.php",
    JSON.stringify(data)
  );
  return request;
};

export default deleteNote;
