import { URLS } from "../Urls";
import { getApiUrl } from "../config";

export const ApiServices = {
  Login: async (params: any, callback: any) => {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(getApiUrl(URLS.LOGIN), {
        method: "POST",
        headers: headers,
        body: params.raw,
      });

      const data = await response.json();

      callback({
        isSuccess: true,
        response: data,
        status: response.status,
      });
    } catch (error) {
      console.log("API ERROR:", error);

      callback({
        isSuccess: false,
        response: error,
      });
    }
  },
  CreateClient: async (params: any, callback: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${params?.token}`);
    console.log("params", params);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: params.raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(getApiUrl(URLS.CLIENTS), requestOptions);

      const data = await response.json();
      console.log("response", response);

      callback({
        isSuccess: true,
        response: data,
        status: response.status,
      });
    } catch (error) {
      console.log("API ERROR:", error);

      callback({
        isSuccess: false,
        response: error,
      });
    }
  },

  GetClients: async (token: any, callback: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(getApiUrl(URLS.CLIENTS), requestOptions);

      const data = await response.json();
      console.log("response", response);

      callback({
        isSuccess: true,
        response: data,
        status: response.status,
      });
    } catch (error) {
      console.log("API ERROR:", error);

      callback({
        isSuccess: false,
        response: error,
      });
    }
  },
};
