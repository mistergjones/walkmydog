import { create } from "apisauce";
// import cache from "../utility/cache";
// import authStorage from "../auth/storage";
import storageService from "../storage/localStorage";

// GJ: You create an api by calling .create() and passing in a configuration object.
const apiClient = create({
    baseURL: "http://localhost:3000/api",
    // baseURL: "http://192.168.0.145:3000/api",
    // baseURL: "http://110.147.196.35:3000/api",
    // baseURL: "http://110.147.196.35/api",
    // URL required for server below
    // baseURL: "https://walkmd.ddns.net/api",
});

// GJ: Establish a function???
const get = apiClient.get;

// GJ: .get accepts 3 parameters - url, params, axiosConfig. WHAT ABOUT .POST???
apiClient.get = async (url, params, axiosConfig) => {
    // Set the headers to pass auth token for protected routes on server.
    console.log(
        "client headers token get = ********************************",
        storageService.getToken()
    );
    apiClient.setHeaders({ "x-auth-token": storageService.getToken() });
    const response = await get(url, params, axiosConfig);

    if (response.ok) {
        // cache.store(url, response.data);
        return response;
    }

    // const data = await cache.get(url);
    // return data ? { ok: true, data } : response;
    return response;
};

const post = apiClient.post;

apiClient.post = async (url, data, axiosConfig) => {
    console.log(
        "client headers token post = ********************************",
        storageService.getToken()
    );
    apiClient.setHeaders({ "x-auth-token": storageService.getToken() });

    const response = await post(url, data, axiosConfig);

    if (response.ok) {
        return response;
    }

    return response;
};

export default apiClient;
