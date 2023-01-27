import axios from "axios";
import URL from "URL";

const getBooks = async (data) => {
  const api = axios.create({ baseURL: URL.servidor });
  const request = await api.post(
    "/api-php-react/info_libros.php",
    JSON.stringify(data)
  );

  return request;
};

export default getBooks;
