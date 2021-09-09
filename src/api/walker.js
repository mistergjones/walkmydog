import storageService from "../storage/localStorage";
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/walkers/";

const updateProfile = (profile) => {
    // client.setHeaders({ "x-auth-token": storageService.getToken() })
    console.log("update profile token = ", storageService.getToken());
    console.log("profile = ", profile);
    const profileEndpoint = "profile/";
    return client.post(endpoint + profileEndpoint, profile);
};

const getWalkerPreferences = (walkerId) => {
    const preferenceEndpoint = endpoint + "preferences/" + walkerId;

    return client.get(preferenceEndpoint);
};

// GJ: 07/09: The below is used to obtain all the completed jobs for the walker by walker_id
const getWalkerHistoricalCompletions = (walker_id) => {
    const userEndpoint = endpoint + walker_id;
    console.log(
        "walker.js -> The getWalkerHistoricalCompletions point is:",
        userEndpoint
    );
    return client.get(userEndpoint);
};

export default {
    updateProfile,
    getWalkerHistoricalCompletions,
    getWalkerPreferences,
};
