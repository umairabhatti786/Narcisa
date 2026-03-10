import { URLS } from "../Urls";
import { getApiUrl } from "../config";

export const ApiServices = {

  Login: async (params: any, callback: any) => {

  const headers = {
    "Content-Type": "application/json",
  };

  try {

    console.log("API URL:", getApiUrl(URLS.LOGIN));

    const response = await fetch(getApiUrl(URLS.LOGIN), {
      method: "POST",
      headers: headers,
      body: params.raw,
    });

    const data = await response.json();

    console.log("API STATUS:", response.status);
    console.log("API DATA:", data);

    callback({
      isSuccess: true,
      response: data,
      status:response.status
    });

  } catch (error) {

    console.log("API ERROR:", error);

    callback({
      isSuccess: false,
      response: error,
      
    });

  }

}

};