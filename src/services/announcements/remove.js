import axios from "axios";
import URL from "URL";

const remove = async (data) => {
  const api = axios.create({ baseURL: URL.servidor });
  const request = await api.post(
    "/api-php-react/CRUD_anuncios.php",
    JSON.stringify(data)
  );
  return request;
};

export default remove;
