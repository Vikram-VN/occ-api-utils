
export const identity = value => value;

export const noop = () => { };

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const getEmptyString = () => '';

export const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export const isEmptyObject = obj => {
  if (obj == null || typeof obj === 'string') {
    return true;
  }

  if (obj.keys !== 'undefined') {
    return Object.keys(obj).length === 0;
  }

  return true;
};

export const t = (value, substitutions) => {
  if (value && substitutions) {
    for (const key in substitutions) {
      value = value.replace(new RegExp(`__${key}__`, 'gi'), substitutions[key]);
    }
  }

  return value;
};

export const objToClassName = obj => {
  let className = '';
  if (typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key]) {
        if (className) {
          className += ' ';
        }
        className += key;
      }
    }
  }

  return className;
};

export const arrayToMap = (array, key, transformObjectCallback) => {
  const result = {};
  if (!array) {
    return result;
  }
  for (const item of array) {
    result[item[key]] = transformObjectCallback ? transformObjectCallback(item) : item;
  }

  return result;
};

export const getBaseURL = ({ req, window, withoutProtocol }) => {
  // from node server
  if (req && req.get) {
    return `${withoutProtocol ? '' : `${req.protocol}:`}//${req.get('host')}${req.baseUrl}`;
  }
  // from browser
  if (window && window.location) {
    let baseUrl = `${withoutProtocol ? '' : window.location.protocol}//${window.location.host}`;
    if (window.siteBaseURLPath && window.siteBaseURLPath !== '/') {
      baseUrl += window.siteBaseURLPath;
    }

    return baseUrl;
  }

  return '';
};

export const normalizePath = pathname => `/${pathname.replace(/^\//, '').replace(/\/$/, '')}/`.replace('//', '/');

export const searchStringToQueryParams = searchString => {
  if (!searchString || searchString.length === 0) {
    return {};
  }
  //Remove ? from start of string (if present)
  const modifiedSearchString = searchString.includes('?')
    ? searchString.slice(searchString.indexOf('?') + 1)
    : searchString;
  if (!modifiedSearchString || modifiedSearchString.length === 0) {
    return {};
  }
  const listOfQueryParams = modifiedSearchString.split('&');
  const queryParams = {};
  listOfQueryParams.forEach(item => {
    const [key, value] = item.split('=');
    queryParams[key] = value;
  });

  return queryParams;
};

export const uuid = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const merge = (target, source, opts = {}) => {
  const options = {
    override: false,
    warn: false,
    source: 'unknown',
    ...opts
  };

  // 2 objects may require deep merging
  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(target, { [key]: source[key] });
        } else {
          target[key] = merge(target[key], source[key], options);
        }
      } else if (options.override || !target[key]) {
        Object.assign(target, { [key]: source[key] });
      }
    }
  } else if (Array.isArray(target) && Array.isArray(source)) {
    // for arrays, just add in non existing values to target from source.
    target = target.slice();

    for (const value of Object.values(source)) {
      if (!target.includes(value)) {
        target.push(value);
      }
    }
  }

  return target;
};

export const argCheckForEmptyObjects = args => {
  return !isObject(args) || isEmptyObject(args) ? true : false;
};

export const debounce = (func, delay) => {
  let inDebounce;

  return function (event, data) {
    const myEvent = { ...event };
    clearTimeout(inDebounce);
    inDebounce = setTimeout(func, delay, myEvent, data);
  };
};

export const throttle = (fn, delay) => {
  let inThrottle;

  const throttled = (...args) => {
    const func = () => {
      inThrottle = null;
      fn(...args);
    };
    if (inThrottle) {
      return;
    }
    inThrottle = setTimeout(func, delay);
  };

  return throttled;
};

export const sortArrayByKeyAsc = (array, key) => {
  array.sort((option1, option2) => {
    if (option1[key] < option2[key]) return -1;
    if (option1[key] > option2[key]) return 1;

    return 0;
  });
};

export const valueIsTrue = value => {
  return value === true || value === 'true';
};

export const formatDate = (dateVal = '') => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  let dateRes = '';
  if (date.toString() === 'Invalid Date') {
    dateRes = '';
  }
  dateRes = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`;

  return dateRes;
};


const ABSOLUTE_URL = /^(http[s]?:\/\/|\/)/i;

const areEmptyObjects = (a, b) => {
  return a && b && typeof a === 'object' && typeof b === 'object' && isEmptyObject(a) && isEmptyObject(b);
};

export const arraysEqual = (a, b) => {
  if (Object.is(a, b)) {
    return true;
  }

  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }

  return true;
};

const { hasOwnProperty } = Object.prototype;

export const shallowEqual = (a, b) => {
  if (areEmptyObjects(a, b)) {
    return true;
  }
  if (arraysEqual(a, b)) {
    return true;
  }

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (areEmptyObjects(a[keysA[i]], b[keysA[i]])) {
      continue;
    }
    if (!hasOwnProperty.call(b, keysA[i]) || !arraysEqual(a[keysA[i]], b[keysA[i]])) {
      return false;
    }
  }

  return true;
};

const processKey = (obj, props) => {
  const { keys, value } = props;

  const currentKey = keys[0];

  // if there's only one key process and return
  if (keys.length === 1) {
    if (currentKey === '') {
      // if blank then it's an array so push value into it
      obj.push(value);
    } else {
      // assign value to object property or array position
      obj[currentKey] = value;
    }
  } else {
    const currentKeyNotDefined = obj[currentKey] === undefined;
    const currentKeyNotDefinedOrNotArray = currentKeyNotDefined || !Array.isArray(obj[currentKey]);
    const currentKeyNotDefinedOrNotObject = currentKeyNotDefined || !isObject(obj[currentKey]);
    const nextKey = keys[1];

    if (nextKey === '') {
      if (currentKeyNotDefinedOrNotArray) {
        // create an array for array values
        obj[currentKey] = [];
      }
    } else if (Number.isInteger(parseFloat(nextKey))) {
      // is a digit i.e. array index
      if (currentKeyNotDefinedOrNotArray) {
        // create an array for array values
        obj[currentKey] = [];
      }
    } else if (currentKeyNotDefinedOrNotObject) {
      // create an object
      obj[currentKey] = {};
    }

    // call process key again
    const lastKey = keys.slice(1);
    processKey(obj[currentKey], { keys: lastKey, value });
  }
};


export const formToJson = form => {
  const json = {};

  new FormData(form).forEach((value, key) => {
    // split the key out into an array of keys, a new key for each value wrapped
    // in squared brackets arrays should return an empty key then the value
    const keys = key.split('[').map(key => key.replace(/\]/g, ''));
    // pass the keys and the form field value to the function
    processKey(json, { keys, value });
  });

  return json;
};

export const formToUrl = form => {
  const url = new URL(form.action);

  new FormData(form).forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  return url;
};

export const formToHref = form => {
  const url = formToUrl(form);
  if (!ABSOLUTE_URL.test(form.getAttribute('action'))) {
    return url.href.replace(document.baseURI, '');
  }

  return url.href;
};


export const getTime = () => {
  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
}


export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const validateEmail = (email) => {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
};

export const loginValidation = (data, setError, checkDetails) => {
  const { name, mobNo, email } = data;
  const { tnc } = checkDetails;

  const regrExp = /^[0-9]+$/;
  const nameRegrExp = /^[A-Za-z\s]+$/;

  if (mobNo.length !== 10) {
    setError({ errormobNo: 'Please enter 10 digit mobile number.' });
    return false;
  } else if (!regrExp.test(mobNo)) {
    setError({ errormobNo: 'Please input only numeric.' });
    return false;
  }

  if (name.length === 0) {
    setError({ errorName: 'Please enter your name.' });
    return false;
  } else if (!nameRegrExp.test(name)) {
    setError({ errorName: 'Please enter only characters' });
    return false;
  }

  if (!validateEmail(email)) {
    setError({ errorEmail: 'Email is not valid' });
    return false;
  }

  if (!tnc) {
    setError({ errorResponse: 'Please accept the Terms & Conditions and Privacy Policy' });
    return false;
  }

  return true;
}