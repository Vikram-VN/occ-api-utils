import CryptoJS from 'crypto-js'
const key = process.env.AES_KEY;
const iv = process.env.AES_IV;

const stringify = (data, type) => {
    switch (type) {
        case 'hash':
            return typeof data === 'object' ? JSON.stringify(data) : typeof data !== 'string' ? String(data) + '||' : data + '||';
        case 'sign':
            return typeof data === 'object' ? JSON.stringify(data) : typeof data !== 'string' ? String(data) : data;
        default:
            if (typeof data === 'object') {
                return JSON.stringify(data);
            } else if (typeof data !== 'string') {
                return String(data);
            } else {
                return data;
            }
    }
}

export const oldHash = (algo, data) => {
    const algos = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    const useAlgo = algos.includes(algo.toUpperCase()) ? algo.toUpperCase() : 'MD5';
    return CryptoJS[useAlgo](data).toString(CryptoJS.enc.Hex);
}

//Hashing functions
export const hash = (algo, data, key) => {
    const algos = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    const useAlgo = algos.includes(algo.toUpperCase()) ? algo.toUpperCase() : 'MD5';
    return CryptoJS[useAlgo](stringify(data, 'hash') + stringify(key)).toString(CryptoJS.enc.Hex);
}

export const sign = (algo, data, key) => {
    const algos = ['HmacMD5', 'HmacSHA1', 'HmacSHA256', 'HmacSHA512',];
    const useAlgo = algos.includes(algo) ? algo : 'HmacSHA256';
    return CryptoJS[useAlgo](stringify(key), stringify(data)).toString(CryptoJS.enc.Hex);
}

export const hex2bin = data => {
    return Buffer.from(stringify(data), 'hex').toString();
}

export const bin2hex = data => {
    return Buffer.from(stringify(data), 'binary').toString('hex');
}

//AES functions
export const aesEncrypt = plainText => {
    return CryptoJS.AES.encrypt(stringify(plainText), CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString();
}

export const aesDecrypt = cipherText => {
    return CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
}

export const base64Encode = data => {
    const buffer = Buffer.from(stringify(data), 'utf-8');
    const encodedData = buffer.toString('base64');
    return encodedData;
};

export const base64Decode = data => {
    const buffer = Buffer.from(stringify(data), 'base64');
    const decodedData = buffer.toString('utf-8');
    return decodedData;
};
