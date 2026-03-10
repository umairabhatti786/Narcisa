import { URLS } from "./Urls";

export const getApiUrl = (endpoint: any) => {
  return URLS.BASE_URL + endpoint;
};