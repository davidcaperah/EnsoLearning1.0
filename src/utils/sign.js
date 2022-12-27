import CryptoJS from 'crypto-js';

const sign = (value)=>{
    return CryptoJS.AES.encrypt(JSON.stringify(value), 'A').toString();
}

export default sign;