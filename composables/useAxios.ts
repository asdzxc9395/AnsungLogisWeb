/* 
  createDate : 2024-01-08
  creator : kyn8330
*/
import axios from "axios";
import { useDialogPopup } from "~/composables/useDialogPopup.js";

export const inst = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;
  const token = useCookie("token");
  const instance = axios.create({
    headers: {
      Accept: "application/json",
      Authorization: `${token.value}`,
      "Content-Type": "application/json",
    },
    timeout: 50000,
    baseURL: baseURL,
  });

  /* TODO:: exception cover */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 404) {
        // 404 not found
      } else if (error.response && error.response.status === 500) {
        // 500 internal server err
      } else {
      }

      const errToast = useToastPopup();
      errToast.actToast(
        "API 호출 결과 : " + error.response.status,
        error.response.data.message || error.response.data.error,
        "error"
      );
      return Promise.reject(error);
    }
  );

  return instance;
};

export const callPost = async (data: object, url: string) => {
  const instance = inst();
  const rtn = await instance
    .post(url, data)
    .then((resp) => {
      return resp.data || resp;
    })
    .catch((err) => {
      // todo:: redirect-error page
      return err.response || err;
    });
  return rtn;
};

export const callGet = async (data: object, url: string) => {
  const instance = inst();
  const rtn = await instance
    .get(url, data)
    .then((resp) => {
      return resp.data || resp;
    })
    .catch((err) => {
      // todo:: redirect-error page
      return err.response || err;
    });
  return rtn;
};

export const callPut = async (data: object, url: string) => {
  const instance = inst();
  const rtn = await instance
    .put(url, data)
    .then((resp) => {
      return resp.data || resp;
    })
    .catch((err) => {
      // todo:: redirect-error page
      return err.response || err;
    });
  return rtn;
};

export const callDel = async (data: object, url: string) => {
  const instance = inst();
  const rtn = await instance
    .delete(url, data)
    .then((resp) => {
      return resp.data || resp;
    })
    .catch((err) => {
      // todo:: redirect-error page
      return err.response || err;
    });
  return rtn;
};

// test code
export const useAxios = async (data: object, url: string, method: string) => {
  const token = useCookie("token");

  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  const result = await axios({
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    timeout: 50000,
    method: method || "GET",
    url: baseURL + url,
    data: data,
  })
    .then((resp) => {
      return resp.data || resp;
    })
    .catch((err) => {
      // todo:: redirect-error page
      return err.response || err;
    });

  return result;
};
