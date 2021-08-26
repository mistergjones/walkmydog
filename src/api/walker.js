import storageService from "../storage/localStorage";
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/walkers/";

const updateProfile = (profile) => {
    // client.setHeaders({ "x-auth-token": storageService.getToken() })
    console.log("update profile token = ", storageService.getToken())
    console.log("profile = ", profile);
    const profileEndpoint = "profile/";
    return client.post(endpoint + profileEndpoint, profile);
};

export default {
    updateProfile
}