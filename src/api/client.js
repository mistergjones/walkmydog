import { create } from "apisauce";
// import cache from "../utility/cache";
// import authStorage from "../auth/storage";
import storageService from '../storage/localStorage';

// GJ: You create an api by calling .create() and passing in a configuration object.
const apiClient = create({
  baseURL: "http://localhost:3000/api",

});





// GJ: Establish a function???
const get = apiClient.get;

// GJ: .get accepts 3 parameters - url, params, axiosConfig. WHAT ABOUT .POST???
apiClient.get = async (url, params, axiosConfig) => {
  // Set the headers to pass auth token for protected routes on server.
  // console.log("client headers token = ********************************", storageService.getToken())
  apiClient.setHeaders({ "x-auth-token": storageService.getToken() })
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    // cache.store(url, response.data);
    return response;
  }

  // const data = await cache.get(url);
  // return data ? { ok: true, data } : response;
  return response;
};



export default apiClient;
