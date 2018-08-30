import axios from "axios";
import qs from "query-string";
import { apiUrl } from "./constants";

export function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

export const addressObjectToText = addressObject => {
  const { address, city, country, state, zipCode } = addressObject || {};

  const addressArr = [address, city, country, state, zipCode];

  let textAddress = addressArr.reduce((field1, field2, index) => {
    return `${field1 || ""} ${(field2 &&
      `${field2.trim()}${index !== addressArr.length - 1 ? "," : ""}`) ||
      ""}`;
  });

  return textAddress.trim();
};

export const getCannabisCost = (lineItems, products, isCannabis = true) => {
  const lineItemWithProduct = lineItems
    .map(lineItem => ({
      ...lineItem,
      product: products.find(product => product.id === lineItem.productId),
    }))
    .filter(lineItem => lineItem.product);

  let wholeCannabisHost = 0;

  lineItemWithProduct.forEach(lineItemProduct => {
    if (
      isCannabis
        ? lineItemProduct.product.category.cannabis
        : !lineItemProduct.product.category.cannabis
    ) {
      const amount =
        lineItemProduct.unitPrice * lineItemProduct.requestQuantity -
        lineItemProduct.discount;

      wholeCannabisHost = wholeCannabisHost + amount;
    }
  });

  return wholeCannabisHost;
};

export const convertToOptionsArray = (list = "", valueField, labelField) => {
  return list.map(item => ({
    value: item[valueField] || "",
    label:
      labelField == "firstName"
        ? item[labelField] + " " + item["lastName"]
        : item[labelField],
  }));
};

export function logOut() {
  return new Promise((res, rej) => {
    saveObject("user", {});
    localStorage.removeItem("user");
    res(true);
  });
}

export function isLoggedIn() {
  let session = getObject("user");

  let accessToken = session && session.accessToken;

  return accessToken;
}

export function logout() {
  saveUser(null);
  return new Promise((res, rej) => res(true));
}

export function getHeaders() {
  let user = getUser();
  return {
    Authorization: `Token ${(user && user.accessToken) || null}`,
  };
}

export function getUser() {
  if (window && window.localStorage) {
    return window.localStorage.getObject("user");
  }

  return null;
}

export function saveUser(value) {
  if (window && window.localStorage) {
    return window.localStorage.saveObject("user", value);
  }

  return null;
}

export function saveObject(key, value) {
  if (window && window.localStorage) {
    window.localStorage.saveObject(key, value);
  }
}

export function removeObject(key) {
  if (window && window.localStorage) {
    window.localStorage.removeItem(key);
  }
}

export function getObject(key) {
  if (window && window.localStorage) {
    return window.localStorage.getObject(key);
  }

  return null;
}

export function generateUrl(path) {
  if (path.includes("http")) {
    return path;
  }
  return apiUrl + path;
}

export function getIntersection(
  FilterFromArr,
  FilterWithArr,
  matchingProperty
) {
  if (FilterFromArr && FilterWithArr && matchingProperty) {
    return [...FilterFromArr].filter(element1 =>
      FilterWithArr.some(element2 => {
        return element1[matchingProperty] == element2[matchingProperty];
      })
    );
  }
}

export function apiReq(endPoint, data, method, headers, requestOptions = {}) {
  return new Promise((res, rej) => {
    headers = {
      ...getHeaders(),
      ...headers,
    };
    if (method == "get" || method == "delete") {
      data = {
        ...requestOptions,
        params: data,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then(result => {
        let { data } = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch(err => {
        return rej(err);
      });
  });
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "post", headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(generateUrl(endPoint), data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "put", headers);
}

export function multiPartData(data) {
  let multiPart = new FormData();

  for (let prop in data) {
    multiPart.append(prop, data[prop]);
  }

  return multiPart;
}

export function randomString(len = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}