import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const decode = (Nombre , key ) => {
    let IdEncriptado =  cookies.get(Nombre)
    let bytes  = CryptoJS.AES.decrypt(IdEncriptado, key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export default decode