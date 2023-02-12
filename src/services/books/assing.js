import axios from "axios";
import URL from "URL";

const assingBook = async (data) => {
  const api = axios.create({ baseURL: URL.servidor });
  const request = await api.post(
    "/api-php-react/info_docente.php",
    JSON.stringify(data)
  );
  return request;
};

export default assingBook;
